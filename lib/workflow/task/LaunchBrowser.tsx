import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { GlobeIcon, LucideProps } from 'lucide-react';

export const LaunchBrowserTask: WorkflowTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch browser',
  icon: (props: LucideProps) => (
    <GlobeIcon className='stroke-pink-400' {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: 'Website Url',
      type: TaskParamType.STRING,
      helperText: 'eg: https://www.google.com',
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: 'web page', type: TaskParamType.BROWSER_INSTANCE }],
};
