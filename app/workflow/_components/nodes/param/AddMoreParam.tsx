import {  PlusIcon, SquarePlus } from 'lucide-react';

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
import { useReactFlow } from '@xyflow/react';
import { taskParamFields } from '@/lib/workflow/task/taskParamFields';

export function AddMoreParam({
  nodeId,
  taskType,
}: {
  nodeId: string;
  taskType: TaskType;
}) {
  const { updateNodeData } = useReactFlow();

  const updateRegistryTaskOutputs = (taskParamType: TaskParamType) => {
    if (!taskType) return;
    const newContent = taskParamFields[taskParamType];

    updateNodeData(nodeId, (node: any) => {
      return {
        ...node.data,
        contant: [
          ...node.data.contant,
          { id: node.data.contant.length + 1, ...newContent },
        ],
      };
    });
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
