import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { MessageCircle } from 'lucide-react';
import { taskParamFields } from './taskParamFields';

export const InitlaMessageTask: WorkflowTask = {
  type: TaskType.TEXT_BUTTONS,
  label: 'Message and buttons',
  icon: (props) => <MessageCircle className='stroke-orange-400' {...props} />,
  isEntryPoint: true,
  credits: 1,
  contant: [
    { ...taskParamFields[TaskParamType.STRING], id: 1, name: 'Message' },
    { ...taskParamFields[TaskParamType.BUTTON], id: 2 },
  ] as const,
};
