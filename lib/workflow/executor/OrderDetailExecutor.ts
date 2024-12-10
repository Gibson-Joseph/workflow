import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

const orderRes = {
  orderId: 'ORD123',
  customerName: 'John Doe',
  orderDate: '2024-12-04',
  totalAmount: 120.5,
  status: 'Processing',
  items: [
    {
      productId: 'PROD001',
      productName: 'Wireless Headphones',
      quantity: 2,
      price: 50.0,
    },
    {
      productId: 'PROD002',
      productName: 'Charging Cable',
      quantity: 1,
      price: 20.5,
    },
  ],
};

export async function OrderDetailExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  sourceNode?: string | null
) {
  try {
    console.log('OrderDetailExecutor function has called');
    const formeatedData = generateDynamicJsonStructure(
      input,
      sourceNode,
      orderRes
    );
    console.log('formeatedData', formeatedData);
    const orderDetails = formeatedData.dynamicContent;

    const message = `Order Details: \n Order ID: ${
      orderDetails.orderId
    }\n Customer Name: ${orderDetails.customerName}\n Order Date: ${
      orderDetails.orderDate
    }\n Total Amount: $${orderDetails.totalAmount.toFixed(2)}\n Status: ${
      orderDetails.status
    }`;

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      message,
      listOfButtons: formeatedData.listOfButtons,
    });
  } catch (error: any) {}
}
