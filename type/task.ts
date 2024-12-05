export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT',
  FILL_INPUT = 'FILL_INPUT',
  CLICK_ELEMENT = 'CLICK_ELEMENT',
  WAIT_FOR_ELEMENT = 'WAIT_FOR_ELEMENT',
  INITAL_MESSAGE = 'INITAL_MESSAGE',
  ORDER_DETAIL = 'ORDER_DETAIL',
  AGENT_REQUEST = 'AGENT_REQUEST',
}

export enum TaskParamType {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE',
  SELECT = 'SELECT',
  IMAGE = 'IMAGE',
  BUTTON = 'BUTTON',
  ORDER_INFO = 'ORDER_INFO',
  AGENT_PROCESSING = 'AGENT_PROCESSING',
  // PLACEHOLDER = 'PLACEHOLDER',
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
