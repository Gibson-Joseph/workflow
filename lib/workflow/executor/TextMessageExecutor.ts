import { MessageData } from '@/lib/helper/meta';
import { generateDynamicJsonStructure } from '@/lib/helper/phases';
import { InputValue } from '@/type/appNode';
import { ExecutionPhase } from '@prisma/client';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';

export async function TextMessageExecutor(
  input: InputValue[],
  Whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  phase: ExecutionPhase
) {
  try {
    const formeatedData = generateDynamicJsonStructure(input, phase.sourceNode);

    await Whatsapp.sendText({
      recipientPhone: messageData.recipientPhone,
      ...formeatedData,
    });
  } catch (error: any) {}
}
