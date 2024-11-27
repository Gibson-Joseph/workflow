'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GetAvailableCredtis() {
  const { userId } = auth();
  if (!userId) {
    throw new Error('unauthenticated');
  }

  const blance = await prisma.userBalance.findUnique({
    where: {
      userId,
    },
  });

  if (!blance) return -1;
  return blance.credits;
}
