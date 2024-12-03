import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { ListOrdered } from 'lucide-react';

export const OrderDetailTask = {
  type: TaskType.ORDER_DETAIL,
  label: 'Order details',
  icon: (props) => <ListOrdered className='stroke-red-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'Order info',
      type: TaskParamType.ORDER_INFO,
      required: true,
    },
  ] as const,
  outputs: [
    // {
    //   name: 'View order',
    //   type: TaskParamType.BUTTON,
    // },
    // {
    //   name: 'Request agent',
    //   type: TaskParamType.BUTTON,
    // },
  ] as const,
} satisfies WorkflowTask;
