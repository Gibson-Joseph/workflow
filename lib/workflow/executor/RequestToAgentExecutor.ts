import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';

export async function RequestToAgentExecutor(input: InputValue[]) {
  try {
    console.log('RequestToAgentExecutor function has called');
    return generateDynamicJsonStructure(input);
  } catch (error: any) {}
}
