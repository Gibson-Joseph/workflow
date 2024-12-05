import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';

export async function InitialMessageExecutor(
  input: InputValue[],
  phaseId: string
) {
  try {
    console.log('InitialMessageExecutor function has called');
    return generateDynamicJsonStructure(input);
  } catch (error: any) {}
}
