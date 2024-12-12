import { ImageDownIcon, PlusIcon, SquarePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskParamType, TaskType } from '@/type/task';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { WorkflowTask } from '@/type/workflow';
import { generateRandomNumber } from '@/lib/helper/phases';

export function AddMoreParam({
  nodeId,
  taskType,
  nodeComponent,
  setNodeComponent,
}: {
  nodeId: string;
  taskType: TaskType;
  nodeComponent: null | WorkflowTask;
  setNodeComponent: Dispatch<SetStateAction<null | WorkflowTask>>;
}) {
  const updateRegistryTaskOutputs = (taskParamType: TaskParamType) => {
    if (!taskType) return;
    const task = TaskRegistry[taskType];

    if (!task) console.error(`Task type ${taskType} not found.`);

    const newOutput = {
      value: generateRandomNumber(),
      name: `test`,
      type: taskParamType,
      required: false,
    };

    setNodeComponent((prev) => {
      if (!prev) {
        console.error('Previous state is null. Cannot update outputs.');
        return null; // or initialize with a default WorkflowTask structure
      }
      console.log('prev', prev);

      return {
        ...prev,
        outputs: [...prev.outputs, newOutput],
      };
    });

    // TaskRegistry[taskType] = {
    //   ...task,
    //   outputs: [...(task.outputs as TaskParam[]), newOutput], // Use type assertion if necessary
    // };
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          Add <PlusIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-72'>
        <DropdownMenuLabel>Content Block</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => updateRegistryTaskOutputs(TaskParamType.IMAGE)}
          >
            <ImageDownIcon />
            <span>Image</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateRegistryTaskOutputs(TaskParamType.BUTTON)}
          >
            <SquarePlus />
            <span>Button</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
