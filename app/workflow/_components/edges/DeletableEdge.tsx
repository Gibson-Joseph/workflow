'use client';
import { Button } from '@/components/ui/button';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from '@xyflow/react';
import React, { memo } from 'react';

const DeletableEdge = ({ ...props }: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
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
            onClick={(es) =>
              setEdges((es) => es.filter((e) => e.id !== props.id))
            }
          >
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(DeletableEdge);
