import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { AlignCenter, UserPlus } from 'lucide-react';

export const RequestToAgentTask = {
  type: TaskType.AGENT_REQUEST,
  label: 'Request to agent',
  icon: (props) => <UserPlus className='stroke-yellow-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'Processing Agent Request',
      type: TaskParamType.AGENT_PROCESSING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      value: 'contact_support',
      name: 'Contact Support',
      type: TaskParamType.BUTTON,
      required: true,
    },
  ] as const,
} satisfies WorkflowTask;
