import { TaskParamType, TaskType } from '@/type/task';
import { WorkflowTask } from '@/type/workflow';
import { CodeIcon, LucideProps, TextIcon } from 'lucide-react';

export const ExtractTextFromElementTask: WorkflowTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => (
    <TextIcon className='stroke-rose-400' {...props} />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true,
      options: [
        {
          label: 'Visible',
          value: 'visible',
        },
        {
          label: 'Hidden',
          value: 'hidden',
        },
      ],
    },
  ] as const,
  outputs: [
    {
      name: 'Extracted text',
      type: TaskParamType.STRING,
    },
  ],
};
