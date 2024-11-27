import { TaskType } from '@/type/task';
import { LaunchBrowserExecutor } from './LaunchBrowserExecutor';
import { PageToHtmlExecutor } from './PagetoHtmlExecutor';
import { ExecutionEnvironment } from '@/type/executor';
import { WorkflowTask } from '@/type/workflow';
import { ExtractTextFromElementExecutor } from './ExtractTextFromElementExecutor';

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutionRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};