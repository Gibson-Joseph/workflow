import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { MessageCircle } from 'lucide-react';

export const InitlaMessageTask: WorkflowTask = {
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
      value:
        'https://cdn.shopify.com/b/shopify-brochure2-assets/1b1f811b810037a7ca35b0b191306c18.jpg',
    },
    {
      name: 'message',
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
      value:
        'Yavar has some great products lined up for you based on your previous shopping history',
    },
  ] as const,
  outputs: [
    {
      value: 'request_agent',
      name: 'Request agent',
      type: TaskParamType.BUTTON,
      required: true,
    },
    {
      value: 'view_order',
      name: 'View order',
      type: TaskParamType.BUTTON,
      required: true,
    },
  ],
};
