'use server';
import prisma from '@/lib/prisma';
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from '@/schema/workflow';
import { AppNode } from '@/type/appNode';
import { TaskType } from '@/type/task';
import { workflowStatus } from '@/type/workflow';
import { auth } from '@clerk/nextjs/server';
import { Edge } from '@xyflow/react';
import { redirect } from 'next/navigation';

export async function CreateWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error('invalid data found');
  }
  const { userId } = auth();
  if (!userId) {
    throw new Error('unauthenticated');
  }
  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  // Let's add the entry flow entry point
  initialFlow.nodes.push(CreateFlowNode(TaskType.INITAL_MESSAGE));

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: workflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });
  if (!result) {
    throw new Error('failed to create workflow');
  }
  redirect(`/workflow/editor/${result.id}`);
}
