import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { ListOrdered } from 'lucide-react';

export const OrderDetailTask: WorkflowTask = {
  type: TaskType.ORDER_DETAIL,
  label: 'Order details',
  icon: (props) => <ListOrdered className='stroke-red-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  contant: [
    {
      name: 'Order info',
      type: TaskParamType.ORDER_INFO,
      required: false,
    },
    {
      name: 'Check status',
      type: TaskParamType.BUTTON,
    },
  ] as const,
};
