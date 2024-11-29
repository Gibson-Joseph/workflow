import { TaskType } from '@/type/task';
import { ExtractTextFromElementTask } from './ExtractTextFromElement';
import { LaunchBrowserTask } from './LaunchBrowser';
import { PageTohtmlTask } from './PageToHtml';
import { WorkflowTask } from '@/type/workflow';
import { FillInputTask } from './FillInput';
import { ClickElementTask } from './ClickElement';
import { WaitForElementTask } from './WaitForElement';

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageTohtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask
};
