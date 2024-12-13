import { Node } from '@xyflow/react';
import { TaskParam, TaskParamType, TaskType } from './task';

export interface ContantValue {
  value: string;
  type: TaskParamType;
  name: string;
  // [key: string]: string;
  targetNode?: string;
}

export interface AppNodeData {
  [key: string]: any;
  // inputs: Record<string, string>[];
  contant: ContantValue[];
  type: TaskType;
  sourceNode?: string;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (nodeValue: string, type: TaskParamType) => void;
  disabled?: boolean;
}

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
