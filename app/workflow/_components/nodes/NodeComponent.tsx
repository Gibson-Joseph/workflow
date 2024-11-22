import { memo } from 'react';
import NodeCard from './NodeCard';
import { NodeProps } from '@xyflow/react';
import NodeHeader from './NodeHeader';
import { AppNodeData } from '@/type/appNode';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { NodeInputs, NodeInput } from './NodeInputs';

const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => {
          return <NodeInput key={input.name} nodeId={id} input={input} />;
        })}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
