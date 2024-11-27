import { ExecutionEnvironment } from '@/type/executor';
import { PageTohtmlTask } from '../task/PageToHtml';

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageTohtmlTask>
): Promise<boolean> {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('Html', html);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
