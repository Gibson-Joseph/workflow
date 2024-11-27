'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GetWorkflowPhasesDetails(phaseId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('unauthenticated');
  }

  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
    include: {
      logs: {
        orderBy: {
          timestamp: 'asc',
        },
      },
    },
  });
}
