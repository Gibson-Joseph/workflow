import { memo } from 'react';
import { NodeProps } from '@xyflow/react';

import NodeCard from './NodeCard';
import NodeHeader from './NodeHeader';

import { Badge } from '@/components/ui/badge';
import { TaskType } from '@/type/task';
import { AppNodeData } from '@/type/appNode';
import { AddMoreParam } from './param/AddMoreParam';
import { Nodecontant, Nodecontants } from './Nodecontants';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;

  return (
    <NodeCard nodeId={id} isSelected={!!selected}>
      {true && <Badge>DEV: {id}</Badge>}
      <NodeHeader taskType={data.type as TaskType} nodeId={id} />
      <Nodecontants>
        <>
          {nodeData.contant.map((content) => {
            return (
              <Nodecontant key={content.id} nodeId={id} contant={content} />
            );
          })}
          <AddMoreParam nodeId={id} taskType={data.type as TaskType} />
        </>
      </Nodecontants>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';
