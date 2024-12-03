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

type ExecutorFn<T extends WorkflowTask> = (inputs: InputValue, phaseId: string) => Promise<any>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutionRegistry: RegistryType = {
  // LAUNCH_BROWSER: LaunchBrowserExecutor,
  // PAGE_TO_HTML: PageToHtmlExecutor,
  // EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  // FILL_INPUT: FillInputExecutor,
  // CLICK_ELEMENT: ClickElementExecutor,
  // WAIT_FOR_ELEMENT: WaitForElementExecutor,
  INITAL_MESSAGE: InitialMessageExecutor,
  ORDER_DETAIL: OrderDetailExecutor,
  AGENT_REQUEST: RequestToAgentExecutor,
};
