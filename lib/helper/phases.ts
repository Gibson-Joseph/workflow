import { ExecutionPhase } from '@prisma/client';
import prisma from '../prisma';
import { ExecutionPhaseStatus } from '@/type/workflow';
import { InputValue } from '@/type/appNode';
import { TaskParamType } from '@/type/task';

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

export function generateDynamicJsonStructure(
  inputData: InputValue[],
  serverData?: any // Pass the server data as an argument
) {
  const structure: any = {};

  inputData.forEach((item) => {
    if (item.type === TaskParamType.STRING && item.name === 'message') {
      structure.message = item.value;
    } else if (item.type === TaskParamType.IMAGE) {
      structure.image = { url: item.value, description: item.name };
    } else if (item.type === TaskParamType.BUTTON) {
      if (!structure.actions) {
        structure.actions = [];
      }

      structure.actions.push({
        label: item.name,
        actionType: item.value,
        targetNode: item.targetNode || null,
      });
    }
  });

  // Merge server data dynamically
  if (serverData) {
    structure.dynamicContent = serverData; // Assume server sends this field
  }

  return structure;
}

export const generateRandomNumber = () => {
  // Generate a random number between 100000 and 999999
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return randomNum.toString();
};
