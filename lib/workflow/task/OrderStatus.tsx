import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { ListOrdered } from 'lucide-react';

export const OrderStausTask: WorkflowTask = {
  type: TaskType.ORDER_STATUS,
  label: 'Order Status',
  icon: (props) => <ListOrdered className='stroke-blue-400' {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'Order Staus',
      type: TaskParamType.PROCESS_RESPONSE,
      required: false,
    },
  ] as const,
  outputs: [],
};
