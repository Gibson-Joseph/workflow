import { ExecutionEnvironment } from '@/type/executor';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';
import * as cheerio from 'cheerio';

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('Selector not defined');
      return false;
    }

    const html = environment.getInput('Html');
    if (!html) {
      environment.log.error('Html not defined');
      console.error('Html not defined');
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.error('Element not found');
      return false;
    }

    const extractedText = $.text(element);

    if (!extractedText) {
      environment.log.error('Element has no text');
      return false;
    }

    environment.setOutput('Extracted text', extractedText);

    return true;
  } catch (error: any) {
    console.error(error);
    environment.log.error(error.message);
    return false;
  }
}
