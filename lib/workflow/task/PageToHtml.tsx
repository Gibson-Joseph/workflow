import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { CodeIcon, LucideProps } from 'lucide-react';

export const PageTohtmlTask: WorkflowTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get HTML form page',
  icon: (props: LucideProps) => (
    <CodeIcon className='stroke-rose-400' {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
    },
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
