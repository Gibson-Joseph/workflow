'use server';
import { updateWorkflowPhase } from '@/lib/helper/phases';
import prisma from '@/lib/prisma';
import { ExecutionRegistry } from '@/lib/workflow/executor/registry';
import { TaskType } from '@/type/task';
import { ExecutionPhaseStatus } from '@/type/workflow';

export async function GetChatMessage(message: string) {
  try {
    const workflowExecutionPhase = await prisma.executionPhase.findMany({
      where: {
        status: ExecutionPhaseStatus.CREATED,
      },
    });
    console.log('workflowExecutionPhase', workflowExecutionPhase);
    const phase = workflowExecutionPhase.find(
      (node) => node.status === ExecutionPhaseStatus.CREATED
    );
    const executor = ExecutionRegistry[phase?.nodeType! as TaskType];
    if (!executor) {
      throw new Error('Could not find the executor');
    }
    if (!phase?.inputs) return;
    const pharsedInputs = JSON.parse(phase.inputs!);
    const res = await executor(pharsedInputs, phase.id); // Execute phase logic.
    await updateWorkflowPhase(phase.id);
    return res;
  } catch (error) {}

  //   const filteredPhase = workflowExecutionPhase.filter((phase)=>phase.)
}
