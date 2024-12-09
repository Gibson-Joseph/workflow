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
    const messageData = extractMessageData(replyData);
    if (!messageData) return;
    const { messageType, buttonReplyId } = messageData;

    const workflowExecutionPhase = await prisma.executionPhase.findMany({
      where: {
        status: ExecutionPhaseStatus.CREATED,
      },
    });

    let phase;

    console.log('<<-- TYPE OF MSG -->>: ', messageType);

    if (messageType === 'text_message') {
      phase = workflowExecutionPhase.find(
        (node) => node.status === ExecutionPhaseStatus.CREATED
      );
    }

    if (messageType === 'simple_button_message') {
      console.log('button reply id is:', buttonReplyId);
      if (buttonReplyId === 'TARGET_NODE_NOT_FOUND') return;
      phase = workflowExecutionPhase.find(
        (node) => node.nodeId === buttonReplyId
      );
    }

    const executor = ExecutionRegistry[phase?.nodeType! as TaskType];

    if (!executor) {
      throw new Error('Could not find the executor');
    }
    if (!phase?.inputs) return;

    const pharsedInputs = JSON.parse(phase.inputs!) as InputValue[];
    const res = await executor(pharsedInputs, whatsapp, messageData); // Execute phase logic.

    // await updateWorkflowPhase(phase.id);

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
