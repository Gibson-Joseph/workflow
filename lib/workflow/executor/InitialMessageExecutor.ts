import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function InitialMessageExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  sourceNode?: string | null
) {
  try {
    console.log('InitialMessageExecutor function has called');
    const formeatedData = generateDynamicJsonStructure(input, sourceNode);
    console.log('formeated data', formeatedData);

    // await Whatsapp.sendImage({
    //   recipientPhone: messageData.recipientPhone,
    //   caption: 'Test',
    //   file_path: formeatedData.image.url,
    // });

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      ...formeatedData,
    });
  } catch (error: any) {
    console.log('someting went wrong', error);
  }
}
