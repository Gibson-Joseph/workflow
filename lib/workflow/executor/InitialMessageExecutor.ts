import { InputValue } from '@/type/appNode';

export async function InitialMessageExecutor(input: InputValue, phaseId: string) {
  
  try {
    console.log('InitialMessageExecutor function has called');
    return input;
  } catch (error: any) {}
}
