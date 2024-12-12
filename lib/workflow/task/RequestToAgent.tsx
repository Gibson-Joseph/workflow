import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { UserPlus } from 'lucide-react';

export const RequestToAgentTask: WorkflowTask = {
  type: TaskType.AGENT_REQUEST,
  label: 'Request to agent',
  icon: (props) => <UserPlus className='stroke-yellow-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'Message',
      type: TaskParamType.AGENT_PROCESSING,
      value: '',
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
  ],
};
