import { TaskParamType } from '@/type/task';

export const taskParamFields: Record<TaskParamType, any> = {
  BUTTON: {
    type: TaskParamType.BUTTON,
    value: crypto.randomUUID(),
    name: '',
    required: true,
    hideHandle: false,
    targetNode: '',
  },
  STRING: {
    type: TaskParamType.STRING,
    value: '',
    require: true,
    hideHandle: true,
  },
  AGENT_PROCESSING: {},
  IMAGE: {},
  ORDER_INFO: {},
  PROCESS_RESPONSE: {},
};
