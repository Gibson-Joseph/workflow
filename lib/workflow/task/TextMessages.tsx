import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { LucideProps, MessageCircleCodeIcon } from 'lucide-react';

export const TextMessageTask: WorkflowTask = {
  type: TaskType.TEXT_MESSAGE,
  label: 'Text message',
  icon: (props: LucideProps) => (
    <MessageCircleCodeIcon className='stroke-green-400' {...props} />
  ),
  isEntryPoint: false,
  credits: 5,
  contant: [
    {
      name: 'Enter text message',
      type: TaskParamType.STRING,
      required: true,
    },
  ],
};
