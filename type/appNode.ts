import { Node } from '@xyflow/react';
import { TaskParam, TaskType } from './task';

export interface AppNodeData {
  [key: string]: any;
  inputs: Record<string, string>;
  type: TaskType;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (nodeValue: string) => void;
}
