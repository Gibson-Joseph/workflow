import { ExecutionPhase } from '@prisma/client';
import prisma from '../prisma';
import { ExecutionPhaseStatus } from '@/type/workflow';

type Phase = Pick<ExecutionPhase, 'creditsConsumed'>;
export function GetPhasesTotalCose(phases: Phase[]) {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0);
}

export async function updateWorkflowPhase(phaseId: string) {
  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: ExecutionPhaseStatus.COMPLETED,
    },
  });
}
