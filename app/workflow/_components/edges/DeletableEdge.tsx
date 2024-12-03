'use client';
import { Button } from '@/components/ui/button';
import { AppNode } from '@/type/appNode';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from '@xyflow/react';
import React, { memo } from 'react';

const DeletableEdge = ({ ...props }: EdgeProps) => {
  const { setEdges, getNode, updateNodeData } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  const handleDeleteEdge = () => {
    // Filter out the deleted edge
    setEdges((es) => es.filter((e) => e.id !== props.id));

    // Get the target node using `getNode`
    const targetNode = getNode(props.target);
    if (!targetNode) return;

    const sourceNode = getNode(props.source) as AppNode;
    if (!sourceNode) return; // If no source node found, exit early

    // Update the source node's inputs
    const updatedInputs = sourceNode.data.inputs.map((input) =>
      input.targetNode === targetNode.id
        ? { ...input, targetNode: null }
        : input
    );

    // Update the source node's inputs
    updateNodeData(sourceNode.id, {
      ...sourceNode.data,
      inputs: updatedInputs,
    });

    console.log('Updated inputs after edge deletion:', updatedInputs);
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          className=''
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            variant={'ghost'}
            size={'icon'}
            className='w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg'
            onClick={handleDeleteEdge} // Call the function to delete edge
          >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(DeletableEdge);
