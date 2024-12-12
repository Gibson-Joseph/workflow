'use server';

import prisma from '@/lib/prisma';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

import { TaskType } from '@/type/task';
import { InputValue } from '@/type/appNode';
import { ExecutionRegistry } from '@/lib/workflow/executor/registry';
import { META_MESSAGE_TYPE } from '@/type/meta';
import { extractMessageData } from '@/lib/helper/meta';

const thresholdSeconds = parseInt(process.env.MESSAGE_SESSION_IN_SEC!, 10);

function isAfterThreshold(lastActiveAt: Date): boolean {
  const currentTime = new Date();
  const timeDifference =
    (currentTime.getTime() - new Date(lastActiveAt).getTime()) / 1000; // in seconds
  return timeDifference > thresholdSeconds;
}

async function findExecutionPhase(id: string) {
  return prisma.executionPhase.findUnique({
    where: { id },
  });
}

export async function FindNode(replyData: any, whatsapp: WhatsappCloudAPI) {
  try {
    const messageData = extractMessageData(replyData);
    if (!messageData) return;

    const { messageType, buttonReplyId, recipientName, recipientPhone } =
      messageData;
    const workflowExecutionPhases = await prisma.executionPhase.findMany();

    const customer = await prisma.customer.findUnique({
      where: { phoneNo: recipientPhone },
    });

    let phase;

    console.log('<<-- TYPE OF MSG -->>: ', messageType);

    switch (messageType) {
      case META_MESSAGE_TYPE.TEXT_MESSAGE: {
        if (customer && isAfterThreshold(customer.updatedAt)) {
          phase = workflowExecutionPhases[0]; // Execute the first phase
        } else {
          phase = customer?.activePhaseId
            ? await findExecutionPhase(customer.activePhaseId)
            : workflowExecutionPhases[0];
        }
        break;
      }
      case META_MESSAGE_TYPE.SIMPLE_BUTTON_MESSAGE: {
        if (customer && isAfterThreshold(customer.updatedAt)) {
          phase = workflowExecutionPhases[0]; // Execute the first phase
        } else if (buttonReplyId !== 'TARGET_NODE_NOT_FOUND') {
          phase = workflowExecutionPhases.find(
            (node) => node.nodeId === buttonReplyId
          );
        }
        break;
      }
      default:
        throw new Error('Unsupported message type');
    }

    if (!phase) {
      throw new Error('Could not find the phase');
    }

    const executor = ExecutionRegistry[phase.nodeType as TaskType];
    if (!executor) {
      throw new Error('Could not find the executor');
    }

    if (!phase.inputs) {
      throw new Error('Phase inputs are missing');
    }

    const parsedInputs = JSON.parse(phase.inputs) as InputValue[];
    const result = await executor(
      parsedInputs,
      whatsapp,
      messageData,
      phase.sourceNode
    );

    if (customer) {
      await prisma.customer.update({
        where: { phoneNo: recipientPhone },
        data: { activePhaseId: phase.id },
      });
    } else {
      await prisma.customer.create({
        data: {
          name: recipientName,
          activePhaseId: phase.id,
          phoneNo: recipientPhone,
        },
      });
    }

    return result;
  } catch (error: any) {
    console.error('Error in FindNode:', error.message);
    throw new Error(error.message);
  }
}
