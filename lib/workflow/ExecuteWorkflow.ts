import 'server-only';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/type/workflow';
import { ExecutionPhase } from '@prisma/client';
import { AppNode } from '@/type/appNode';
import { TaskRegistry } from './task/registry';
import { ExecutionRegistry } from './executor/registry';
import { Environment, ExecutionEnvironment } from '@/type/executor';
import { TaskParamType } from '@/type/task';
import { Browser, Page } from 'puppeteer';
import { Edge } from '@xyflow/react';
import { LogCollector } from '@/type/log';
import { createLogCollector } from '../log';

export async function ExecuteWorkflow(executationId: string, nextRunAt?: Date) {
  const executation = await prisma.workflowExecution.findUnique({
    where: { id: executationId },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!executation) {
    throw new Error('execution not found');
  }

  const edges = JSON.parse(executation.definition).edges as Edge[];

  // 6:13:15
  // TODO: setup execution environment
  const environment: Environment = {
    phases: {
      //   launchBrowser: {
      //     inputs: {
      //       websiteUrl: 'www.google.com',
      //     },
      //     outputs: {
      //       browser: 'PuppetterInstance',
      //     },
      //   },
    },
  };

  // TODO: initialize workflow execution
  await initializeWorkflowExecution(
    executationId,
    executation.workflowId,
    nextRunAt
  );

  // TODO: initialize phase status
  await initializePhaseStatuses(executation);

  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of executation.phases) {
    // TODO: consume credits
    // TODO: execute phase
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
      executation.userId
    );
    creditsConsumed += phaseExecution.creditsConsumed;
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  // TODO: finalize execution
  await finalizeWorkflowExecution(
    executationId,
    executation.workflowId,
    executionFailed,
    creditsConsumed
  );

  // TODO: clean up environment
  await cleanupEnvironment(environment);

  revalidatePath('/workflow/runs');
}

async function initializeWorkflowExecution(
  executationId: string,
  workflowId: string,
  nextRunAt?: Date
) {
  await prisma.workflowExecution.update({
    where: {
      id: executationId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executationId,
      ...(nextRunAt && { nextRunAt }),
    },
  });
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
}

async function finalizeWorkflowExecution(
  executationId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executationId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executationId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {
      // ignore
      // this means that we have triggered other runs for this workflow
      // while an execution was running
    });
}

async function executeWorkflowPhase(
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[],
  userId: string
) {
  const logCollector = createLogCollector();

  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;
  setupEnvironmentForPhase(node, environment, edges);

  // Update phse status
  await prisma.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  const creditsRequire = TaskRegistry[node.data.type].credits;
  console.log(
    `Execting phase ${phase.name} with ${creditsRequire} credits required`
  );

  // TODO: decrement user balance type ( with required credits )
  let success = await decrementCredits(userId, creditsRequire, logCollector);
  const creditsConsumed = success ? creditsRequire : 0;

  //   // Execute phase simulation
  //   await waitFor(2000);
  //   const success = Math.random() < 0.7;
  if (success) {
    // We can execute the phase if the credits are safficient
    success = await executePhase(phase, node, environment, logCollector);
  }

  const outputs = environment.phases[node.id].outputs;
  await finalizePhase(
    phase.id,
    success,
    outputs,
    logCollector,
    creditsConsumed
  );
  return { success, creditsConsumed };
}

async function finalizePhase(
  phsaeId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector,
  creditsConsumed: number
) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phsaeId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
      creditsConsumed,
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            message: log.message,
            logLevel: log.level,
            timestamp: log.timestamp,
          })),
        },
      },
    },
  });
}

async function executePhase(
  phase: ExecutionPhase,
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): Promise<boolean> {
  const runFn = ExecutionRegistry[node.data.type];
  if (!runFn) return false;
  const executionEnvironment: ExecutionEnvironment<any> =
    createExecutionEnvironment(node, environment, logCollector);
  return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(
  node: AppNode,
  environment: Environment,
  edges: Edge[]
) {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) continue;
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // Get input value from outputs in the environment
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );
    if (!connectedEdge) {
      console.error('Missing edge for input', input.name, 'node id', node.id);
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

function createExecutionEnvironment(
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): ExecutionEnvironment<any> {
  return {
    getInput: (name: string) => environment.phases[node.id].inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },

    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),

    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),
    log: logCollector,
  };
}

async function cleanupEnvironment(environment: Environment) {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((err) => console.error('can not close browser, reason:', err));
  }
}

async function decrementCredits(
  userId: string,
  amount: number,
  logCollector: LogCollector
) {
  try {
    await prisma.userBalance.update({
      where: {
        userId,
        credits: {
          gte: amount,
        },
      },
      data: {
        credits: {
          decrement: amount,
        },
      },
    });
    return true;
  } catch (error) {
    logCollector.error('insufficient balance');
    return false;
  }
}
