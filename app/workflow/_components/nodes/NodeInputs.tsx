import { cn } from '@/lib/utils';
import { TaskParam } from '@/type/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import React, { ReactNode } from 'react';
import NodeParamField from './NodeParamField';
import { colorForHanlde } from './common';
import useFlowvalidation from '@/components/hooks/useFlowValidation';
interface NodeInputsProps {
  children: ReactNode;
}
export const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className='flex flex-col divide-y'>{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowvalidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        'flex justify-start relative p-3 bg-secondary w-full',
        hasErrors && 'bg-destructive/30'
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          isConnectable={!isConnected}
          id={input.name}
          type='target'
          position={Position.Left}
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
            colorForHanlde[input.type]
          )}
        />
      )}
    </div>
  );
};
