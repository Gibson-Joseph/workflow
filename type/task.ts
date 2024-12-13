export enum TaskType {
  INITAL_MESSAGE = 'INITAL_MESSAGE',
  ORDER_DETAIL = 'ORDER_DETAIL',
  AGENT_REQUEST = 'AGENT_REQUEST',
  TEXT_MESSAGE = 'TEXT_MESSAGE',
  ORDER_STATUS = 'ORDER_STATUS',
}

export enum TaskParamType {
  STRING = 'STRING',
  IMAGE = 'IMAGE',
  BUTTON = 'BUTTON',
  ORDER_INFO = 'ORDER_INFO',
  AGENT_PROCESSING = 'AGENT_PROCESSING',
  PROCESS_RESPONSE = 'PROCESS_RESPONSE',
}

export enum TargetParamType {
  REQUEST_AGENT = 'REQUEST_AGENT',
  VIEW_ORDER = 'VIEW_ORDER',
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}
