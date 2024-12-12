import { MessageData } from '@/lib/helper/meta';
import {
  generateDynamicJsonStructure,
  generateRandomNumber,
} from '@/lib/helper/phases';
import prisma from '@/lib/prisma';
import { InputValue } from '@/type/appNode';
import { ExecutionPhase } from '@prisma/client';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function OrderDetailExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  phase: ExecutionPhase
) {
  const orderRes = {
    orderId: `ORD-${generateRandomNumber()}`,
    customerName: 'John Doe',
    orderDate: '2024-12-04',
    totalAmount: 120.5,
    status: 'Processing',
  };

  try {
    const formeatedData = generateDynamicJsonStructure(
      input,
      phase.sourceNode,
      orderRes
    );
    const orderDetails = formeatedData.dynamicContent;

    const message = `Order Details: \n Order ID: ${
      orderDetails.orderId
    }\n Customer Name: ${orderDetails.customerName}\n Order Date: ${
      orderDetails.orderDate
    }\n Total Amount: $${orderDetails.totalAmount.toFixed(2)}\n Status: ${
      orderDetails.status
    }`;

    const customer = await prisma.customer.findUnique({
      where: {
        phoneNo: messageData.recipientPhone,
      },
    });

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      message,
      listOfButtons: formeatedData.listOfButtons,
    });

    const orderInfo = {
      orderId: orderRes.orderId,
      status: 'IN-PROGRESS',
    };

    if (!customer) return;
    // Check if an execution output already exists for this customer and node
    const existingOutput = await prisma.executionOutput.findFirst({
      where: {
        customerId: customer.id,
        nodeId: phase.nodeId,
      },
    });

    if (existingOutput) {
      // Update the existing record
      await prisma.executionOutput.update({
        where: {
          id: existingOutput.id,
        },
        data: {
          ExecutionOutput: JSON.stringify(orderInfo), // Update the output value
        },
      });
      console.log('Updated existing execution output');
    } else {
      // Create a new record
      await prisma.executionOutput.create({
        data: {
          ExecutionOutput: JSON.stringify(orderInfo),
          customerId: customer.id,
          nodeId: phase.nodeId,
        },
      });
    }
  } catch (error: any) {
    console.log('someting went wrong', error);
  }
}
