import { TaskType } from '@/type/task';
import { InitlaMessageTask } from './InitialMessage';
import { OrderDetailTask } from './OrderDetail';
import { RequestToAgentTask } from './RequestToAgent';
import { TextMessageTask } from './TextMessages';
import { OrderStausTask } from './OrderStatus';
import { WorkflowTask } from '@/type/workflow';

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Record<TaskType, WorkflowTask> = {
  TEXT_BUTTONS: InitlaMessageTask,
  ORDER_DETAIL: OrderDetailTask,
  AGENT_REQUEST: RequestToAgentTask,
  TEXT_MESSAGE: TextMessageTask,
  ORDER_STATUS: OrderStausTask,
};
