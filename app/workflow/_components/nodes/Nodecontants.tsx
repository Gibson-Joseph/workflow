import { cn } from '@/lib/utils';
import { TaskParam, TaskParamType, TaskType } from '@/type/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import React, { ReactNode } from 'react';
import NodeParamField from './NodeParamField';
import { colorForHanlde } from './common';
import useFlowvalidation from '@/components/hooks/useFlowValidation';
interface NodecontantsProps {
  children: ReactNode;
}
export const Nodecontants = ({ children }: NodecontantsProps) => {
  return <div className='flex flex-col divide-y'>{children}</div>;
};

export const Nodecontant = ({
  contant,
  nodeId,
}: {
  contant: TaskParam;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowvalidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) =>
      edge.target === nodeId && edge.targetHandle === contant.id.toString()
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === contant.id.toString());

  return (
    <div
      className={cn(
        'flex justify-start relative p-3 bg-secondary w-full',
        hasErrors && 'bg-destructive/30'
      )}
    >
      {!contant.hideHandle && [TaskParamType.BUTTON].includes(contant.type) && (
        <Handle
          id={contant.id.toString()}
          type='source'
          position={Position.Right}
          className={cn(
            '!bg-muted-foreground !border-2 !-right-2 !w-4 !h-4',
            colorForHanlde[contant.type]
          )}
        />
      )}
      <NodeParamField param={contant} nodeId={nodeId} disabled={isConnected} />

      {!contant.hideHandle &&
        [
          TaskParamType.IMAGE,
          TaskParamType.STRING,
          TaskParamType.ORDER_INFO,
          TaskParamType.AGENT_PROCESSING,
          TaskParamType.PROCESS_RESPONSE,
        ].includes(contant.type) && (
          <Handle
            isConnectable={!isConnected}
            id={contant.id.toString()}
            type='target'
            position={Position.Left}
            className={cn(
              '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
              colorForHanlde[contant.type]
            )}
          />
        )}
    </div>
  );
};
