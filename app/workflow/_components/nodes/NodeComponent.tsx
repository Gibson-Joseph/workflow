import { memo, useEffect, useState } from 'react';
import NodeCard from './NodeCard';
import { NodeProps } from '@xyflow/react';
import NodeHeader from './NodeHeader';
import { AppNodeData } from '@/type/appNode';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { NodeInputs, NodeInput } from './NodeInputs';
import { NodeOutput, NodeOutputs } from './NodeOutputs';
import { Badge } from '@/components/ui/badge';
import { TaskParam, TaskParamType, TaskType } from '@/type/task';
import { AddMoreParam } from './param/AddMoreParam';
import { WorkflowTask } from '@/type/workflow';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const [nodeComponent, setNodeComponent] = useState<null | WorkflowTask>(null);

  useEffect(() => {
    if (!data || nodeComponent) return;
    const nodeData = data as AppNodeData;
    const task = TaskRegistry[nodeData.type];
    setNodeComponent(task);
    console.log('task', task);
  }, [data, nodeComponent]);
  if (!nodeComponent) return;

  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      {DEV_MODE && <Badge>DEV: {id}</Badge>}
      <NodeHeader taskType={data.type as TaskType} nodeId={id} />
      <NodeInputs>
        {nodeComponent.inputs.map((input) => {
          return <NodeInput key={input.name} nodeId={id} input={input} />;
        })}
      </NodeInputs>

      <NodeOutputs>
        {nodeComponent.outputs.map((output) => {
          return <NodeOutput key={output?.name} output={output} nodeId={id} />;
        })}
        <AddMoreParam
          nodeId={id}
          taskType={data.type as TaskType}
          nodeComponent={nodeComponent}
          setNodeComponent={setNodeComponent}
        />
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
