import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function InitialMessageExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData
) {
  try {
    console.log('InitialMessageExecutor function has called');
    const formeatedData = generateDynamicJsonStructure(input);
    console.log('formeated data', formeatedData);

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      ...formeatedData,
    });

    await Whatsapp.sendImage({
      recipientPhone: 'your recipient phone number here',
      caption: 'Test',
      file_path: 'https://example.com/image.png',
    });
  } catch (error: any) {
    console.log('someting went wrong', error);
  }
}
