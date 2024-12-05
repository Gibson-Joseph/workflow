import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

const orderDetail = {
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
  whatsapp: WhatsappCloudAPI
) {
  try {
    console.log('OrderDetailExecutor function has called');
    return generateDynamicJsonStructure(input, orderDetail);
  } catch (error: any) {}
}
