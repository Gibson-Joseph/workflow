import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function RequestToAgentExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData
) {
  try {
    console.log('RequestToAgentExecutor function has called');
    const formeatedData = generateDynamicJsonStructure(input);
    console.log('formeatedData', formeatedData);

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      ...formeatedData,
    });
  } catch (error: any) {
    console.log('someting went wrong', error);
  }
}
