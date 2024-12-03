import {
  ReplayParmType,
  TargetParamType,
  TaskParamType,
  TaskType,
} from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { MessageCircle } from 'lucide-react';

export const InitlaMessageTask = {
  type: TaskType.INITAL_MESSAGE,
  label: 'Initial message',
  icon: (props) => <MessageCircle className='stroke-orange-400' {...props} />,
  isEntryPoint: true,
  credits: 1,
  inputs: [
    {
      name: 'Image',
      type: TaskParamType.IMAGE,
      required: true,
      hideHandle: true,
    },
    {
      name: 'message',
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      value: 'view_order',
      name: 'View order',
      type: TaskParamType.BUTTON,
      required: true,
    },
    {
      value: 'request_agent',
      name: 'Request agent',
      type: TaskParamType.BUTTON,
      required: true,
    },
  ] as const,
} satisfies WorkflowTask;
