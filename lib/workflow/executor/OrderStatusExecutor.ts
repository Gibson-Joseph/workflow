import { MessageData } from '@/lib/helper/meta';
import prisma from '@/lib/prisma';
import { ContantValue } from '@/type/appNode';
import { ExecutionPhase } from '@prisma/client';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function OrderStatusExecutor(
  contants: ContantValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  phase: ExecutionPhase
) {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        phoneNo: messageData.recipientPhone,
      },
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    if (!phase.sourceNode) {
      throw new Error('Could not found the source node');
    }

    const getExecutionOutput = await prisma.executionOutput.findFirst({
      where: {
        customerId: customer.id,
        nodeId: phase.sourceNode,
      },
    });

    if (!getExecutionOutput) {
      throw new Error('Could not found the execution output');
    }

    const parsedOutput = JSON.parse(getExecutionOutput.ExecutionOutput);
    const message = `Your order status:\n\nOrder ID: ${parsedOutput.orderId}\nStatus: ${parsedOutput.status}`;

    await Whatsapp.sendText({
      recipientPhone: messageData.recipientPhone,
      message,
    });
  } catch (error) {
    console.log('someting went wrong', error);
  }
}
