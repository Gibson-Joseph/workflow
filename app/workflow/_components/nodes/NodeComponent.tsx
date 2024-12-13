import { memo, useEffect, useState } from 'react';
import { NodeProps } from '@xyflow/react';

import NodeCard from './NodeCard';
import NodeHeader from './NodeHeader';

import { Badge } from '@/components/ui/badge';
import { TaskType } from '@/type/task';
import { AppNodeData } from '@/type/appNode';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { AddMoreParam } from './param/AddMoreParam';
import { WorkflowTask } from '@/type/workflow';
import { Nodecontant, Nodecontants } from './Nodecontants';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const [nodeComponent, setNodeComponent] = useState<null | WorkflowTask>(null);

  useEffect(() => {
    if (!data || nodeComponent) return;
    const nodeData = data as AppNodeData;
    const task = TaskRegistry[nodeData.type];
    // task.outputs = nodeData.outputs;
    setNodeComponent(task);
  }, [data, nodeComponent]);
  if (!nodeComponent) return;

  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      {DEV_MODE && <Badge>DEV: {id}</Badge>}
      <NodeHeader taskType={data.type as TaskType} nodeId={id} />
      <Nodecontants>
        <>
          {nodeComponent.contant.map((content) => {
            return (
              <Nodecontant key={content.name} nodeId={id} contant={content} />
            );
          })}
          <AddMoreParam
            nodeId={id}
            taskType={data.type as TaskType}
            nodeComponent={nodeComponent}
            setNodeComponent={setNodeComponent}
          />
        </>
      </Nodecontants>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
