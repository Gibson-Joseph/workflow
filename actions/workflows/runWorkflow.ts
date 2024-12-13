'use server';

import prisma from '@/lib/prisma';
import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { WorkflowExectionPlan, WorkflowExecutionStatus } from '@/type/workflow';
import { auth } from '@clerk/nextjs/server';

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('unathenicated');
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error('WorkflowId is required');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error('workflow not found');
  }

  let executionPlan: WorkflowExectionPlan;
  let workflowDefinition = flowDefinition;

  if (!flowDefinition) {
    throw new Error('flow definition is not defined');
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error('flow definition not valid');
  }

  if (!result.executionPlan) {
    throw new Error('no execution plan generated');
  }

  executionPlan = result.executionPlan;

  await prisma.workflowExecution.deleteMany({
    where: {
      workflowId: workflowId,
      userId,
    },
  });

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      definition: workflowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              number: phase.phase,
              name: TaskRegistry[node.data.type].label,
              contants: JSON.stringify(node.data.contant),
              nodeType: node.data.type,
              nodeId: node.id,
              sourceNode: node.data.sourceNode,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  // Update the customer's active phaseId while update the execution
  await prisma.customer.updateMany({
    data: {
      activePhaseId: null,
    },
  });

  if (!execution) {
    throw new Error('workflow execution not created');
  }

  // ExecuteWorkflow(execution.id); // run this on background
  // redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
