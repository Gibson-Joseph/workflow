'use server';
import prisma from '@/lib/prisma';
import { workflowStatus } from '@/type/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('unathenticated');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) throw new Error('Worflow not found');
  if (workflow.status !== workflowStatus.DRAFT)
    throw new Error('Workflow is not draft');

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });

  revalidatePath('/workflows');
}
