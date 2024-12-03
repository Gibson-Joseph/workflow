import { InputValue } from '@/type/appNode';

export async function RequestToAgentExecutor(
  input: InputValue,
  phaseId: string
) {
  try {
    console.log('RequestToAgentExecutor function has called');
    return input;
  } catch (error: any) {}
}
