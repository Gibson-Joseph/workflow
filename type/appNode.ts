import { Node } from '@xyflow/react';
import { TaskParam, TaskParamType, TaskType } from './task';

export interface ContantValue {
  id: number;
  value: string;
  type: TaskParamType;
  name: string;
  targetNode?: string;
  // [key: string]: string;
}

export interface AppNodeData {
  [key: string]: any;
  // inputs: Record<string, string>[];
  contant: TaskParam[];
  type: TaskType;
  sourceNode?: string;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  disabled?: boolean;
  removeNodeParam: (contantId: number) => void;
  addNodeParamValue: (nodeValue: string, type: TaskParamType) => void;
}

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
