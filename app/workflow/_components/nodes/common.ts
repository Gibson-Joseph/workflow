import { TaskParamType } from '@/type/task';

export const colorForHanlde: Record<TaskParamType, string> = {
  STRING: '!bg-amber-400',
  BUTTON: '!bg-green-400',
  IMAGE: '!bg-red-400',
  AGENT_PROCESSING: '!bg-yellow-400',
  ORDER_INFO: '!bg-blue-400',
  PROCESS_RESPONSE: '!bg-purple-400',
};
