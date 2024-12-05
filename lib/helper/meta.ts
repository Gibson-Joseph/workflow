import { META_MESSAGE_TYPE } from '@/type/meta';

export type MessageData = {
  messageId: string;
  messageType: META_MESSAGE_TYPE | any;
  recipientName: string;
  recipientPhone: string;
  messageContent: any;
};

export function extractMessageData(data: any): MessageData | null {
  if (!data?.isMessage) {
    return null;
  }

  const incomingMessage = data.message;

  const messageId = incomingMessage?.message_id || '';
  const messageType = incomingMessage?.type || '';
  const recipientName = incomingMessage?.from?.name || '';
  const recipientPhone = incomingMessage?.from?.phone || '';
  const messageContent = incomingMessage?.content || null;

  return {
    messageId,
    messageType,
    recipientName,
    recipientPhone,
    messageContent,
  };
}
