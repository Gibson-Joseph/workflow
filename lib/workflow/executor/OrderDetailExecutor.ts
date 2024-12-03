import { InputValue } from '@/type/appNode';

export async function OrderDetailExecutor(input: InputValue, phaseId: string) {
  try {
    console.log('OrderDetailExecutor function has called');
    return input;
  } catch (error: any) {}
}
