import { LucideProps } from 'lucide-react';
import { FC } from 'react';
import { TaskParam, TaskType } from './task';
import { AppNode } from './appNode';

export enum workflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type WorkflowTask = {
  label: string;
  icon: FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type WorkflowExectionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExectionPlan = WorkflowExectionPlanPhase[];

export enum WorkflowExecutionStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum WorkflowExecutionTrigger {
  MANUAL = 'MANUAL',
}

export enum ExecutionPhaseStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
