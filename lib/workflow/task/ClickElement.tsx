import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { MousePointerClick } from 'lucide-react';

export const ClickElementTask: WorkflowTask = {
  type: TaskType.CLICK_ELEMENT,
  label: 'Click Element',
  icon: (props) => <MousePointerClick className='stroke-rose-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
