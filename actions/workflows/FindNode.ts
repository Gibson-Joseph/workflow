'use server';
import { extractMessageData } from '@/lib/helper/meta';
import { updateWorkflowPhase } from '@/lib/helper/phases';
import prisma from '@/lib/prisma';

import { ExecutionRegistry } from '@/lib/workflow/executor/registry';
import { InputValue } from '@/type/appNode';
import { TaskType } from '@/type/task';
import { ExecutionPhaseStatus } from '@/type/workflow';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function FindNode(replyData: any, whatsapp: WhatsappCloudAPI) {
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
    const messageData = extractMessageData(replyData);
    if (!messageData) return;

    const pharsedInputs = JSON.parse(phase.inputs!) as InputValue[];
    const res = await executor(pharsedInputs, whatsapp, messageData); // Execute phase logic.
    
    await updateWorkflowPhase(phase.id);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
