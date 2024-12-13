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
    const updatedSourceInputs = sourceNode.data.contant.map((contant) =>
      contant.targetNode === targetNode.id
        ? { ...contant, targetNode: null }
        : contant
    );

    // Update the source node's inputs
    updateNodeData(sourceNode.id, {
      ...sourceNode.data,
      contant: updatedSourceInputs,
    });

    // Update the target node's data
    updateNodeData(targetNode.id, {
      ...targetNode.data,
      sourceNode: null,
    });
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
