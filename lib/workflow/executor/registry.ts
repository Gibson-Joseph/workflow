import { TaskType } from '@/type/task';
import { InitialMessageExecutor } from './InitialMessageExecutor';
import { OrderDetailExecutor } from './OrderDetailExecutor';
import { RequestToAgentExecutor } from './RequestToAgentExecutor';
import { ContantValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';
import { MessageData } from '@/lib/helper/meta';
import { TextMessageExecutor } from './TextMessageExecutor';
import { OrderStatusExecutor } from './OrderStatusExecutor';
import { ExecutionPhase } from '@prisma/client';

export type ExecutorFn = (
  inputs: ContantValue[],
  whatsapp: WhatsappCloudAPI,
  messageData: MessageData,
  phase: ExecutionPhase
) => void;

type RegistryType = {
  [K in TaskType]: ExecutorFn;
};

export const ExecutionRegistry: RegistryType = {
  TEXT_BUTTONS: InitialMessageExecutor,
  ORDER_DETAIL: OrderDetailExecutor,
  AGENT_REQUEST: RequestToAgentExecutor,
  TEXT_MESSAGE: TextMessageExecutor,
  ORDER_STATUS: OrderStatusExecutor,
};
