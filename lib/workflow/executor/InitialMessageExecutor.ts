import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import { ExecutionPhase } from '@prisma/client';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function InitialMessageExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  phase: ExecutionPhase
) {
  try {
    const formeatedData = generateDynamicJsonStructure(input, phase.sourceNode);

    await Whatsapp.sendSimpleButtons({
      recipientPhone: messageData.recipientPhone,
      ...formeatedData,
    });
  } catch (error: any) {
    console.log('someting went wrong', error);
  }
}
