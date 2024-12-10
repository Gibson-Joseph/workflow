'use client';
import React, { DragEvent } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskType } from '@/type/task';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { Button } from '@/components/ui/button';

export default function TaskMenu() {
  return (
    <aside
      className='w-[340px] min-w-[340px] max-w-[340px] border-r-2
border-separate h-full p-2 px-4 overflow-auto'
    >
      <Accordion type='multiple' defaultValue={['retail']} className='w-full'>
        <AccordionItem value='retail'>
          <AccordionTrigger className='font-bold'>
            Retail controls
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            {/* <TaskMenuBtn taskType={TaskType.INITAL_MESSAGE} /> */}
            <TaskMenuBtn taskType={TaskType.ORDER_DETAIL} />
            <TaskMenuBtn taskType={TaskType.AGENT_REQUEST} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: DragEvent, type: TaskType) => {
    event.dataTransfer?.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed == 'move';
  };

  return (
    <Button
      variant={'secondary'}
      className='flex justify-between items-center gap-2 border w-full'
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className='flex gap-2'>
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}
