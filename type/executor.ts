import { Browser, Page } from 'puppeteer';
import { WorkflowTask } from './workflow';
import { LogCollector } from './log';

export type Environment = {
  browser?: Browser;
  page?: Page;

  // Phases with nodeId as key
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};
