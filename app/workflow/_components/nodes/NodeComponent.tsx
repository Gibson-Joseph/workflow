import { memo } from 'react';
import NodeCard from './NodeCard';
import { NodeProps } from '@xyflow/react';
import NodeHeader from './NodeHeader';
import { AppNodeData } from '@/type/appNode';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { NodeInputs, NodeInput } from './NodeInputs';
import { NodeOutput, NodeOutputs } from './NodeOutputs';
import { Badge } from '@/components/ui/badge';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      {DEV_MODE && <Badge>DEV: {id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={id} />
      <NodeInputs>
        {task.inputs.map((input) => {
          return <NodeInput key={input.name} nodeId={id} input={input} />;
        })}
      </NodeInputs>

      <NodeOutputs>
        {task.outputs.map((output) => {
          return <NodeOutput key={output?.name} output={output} />;
        })}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
