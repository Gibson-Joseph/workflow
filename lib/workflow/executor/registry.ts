import { TaskParam, TaskParamType, TaskType } from '@/type/task';
import { LaunchBrowserExecutor } from './LaunchBrowserExecutor';
import { PageToHtmlExecutor } from './PagetoHtmlExecutor';
import { ExecutionEnvironment } from '@/type/executor';
import { WorkflowTask } from '@/type/workflow';
import { ExtractTextFromElementExecutor } from './ExtractTextFromElementExecutor';
import { FillInputExecutor } from './FillInputExecutor';
import { ClickElementExecutor } from './ClickElementExecutor';
import { WaitForElementExecutor } from './WaitForElementExecutor';
import { InitialMessageExecutor } from './InitialMessageExecutor';
import { OrderDetailExecutor } from './OrderDetailExecutor';
import { RequestToAgentExecutor } from './RequestToAgentExecutor';
import { InputValue } from '@/type/appNode';
import WhatsappCloudAPI from 'whatsappcloudapi_wrapper';
import { MessageData } from '@/lib/helper/meta';

export type ExecutorFn = (
  inputs: InputValue[],
  whatsapp: WhatsappCloudAPI,
  messageData: MessageData
) => Promise<any>;

type RegistryType = {
  [K in TaskType]: ExecutorFn;
};

export const ExecutionRegistry: RegistryType = {
  LAUNCH_BROWSER: (input: InputValue[]): any => {},
  PAGE_TO_HTML: (input: InputValue[]): any => {},
  EXTRACT_TEXT_FROM_ELEMENT: (input: InputValue[]): any => {},
  FILL_INPUT: (input: InputValue[]): any => {},
  CLICK_ELEMENT: (input: InputValue[]): any => {},
  WAIT_FOR_ELEMENT: (input: InputValue[]): any => {},
  INITAL_MESSAGE: InitialMessageExecutor,
  ORDER_DETAIL: OrderDetailExecutor,
  AGENT_REQUEST: RequestToAgentExecutor,
};
