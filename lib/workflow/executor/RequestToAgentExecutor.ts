import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function RequestToAgentExecutor(
  input: InputValue[],
  whatsapp: WhatsappCloudAPI
) {
  try {
    console.log('RequestToAgentExecutor function has called');
    return generateDynamicJsonStructure(input);
  } catch (error: any) {}
}
