import { AppNode } from '@/type/appNode';
import { TaskType } from '@/type/task';
import { TaskRegistry } from './task/registry';

export function CreateFlowNode(
  nodeType: TaskType,
  position?: {
    x: number;
    y: number;
  }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: 'FlowScrapeNode',
    dragHandle: '.drag-handle',
    data: {
      type: nodeType,
      contant: TaskRegistry[nodeType].contant,
    },
    position: position ?? { x: 0, y: 0 },
  };
}
