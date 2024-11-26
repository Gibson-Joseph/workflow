'use client';
import useFlowvalidation from '@/components/hooks/useFlowValidation';
import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import React, { ReactNode } from 'react';

const NodeCard = ({
  nodeId,
  children,
  isSelected,
}: {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
}) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowvalidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        console.log('width and height', width, height);

        const x = (position.x + (width as number)) / 2;
        const y = position.y + height! / 2;
        console.log(x, y);

        if (x === undefined || y === undefined) return;
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col',
        isSelected && 'border-primary',
        hasInvalidInputs && 'border-destructive border-2'
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
