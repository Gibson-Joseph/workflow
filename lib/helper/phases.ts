import { ContantValue } from '@/type/appNode';
import { TaskParamType } from '@/type/task';

export function generateDynamicJsonStructure(
  inputData: ContantValue[],
  sourceNode?: string | null,
  serverData?: any // Pass the server data as an argument
) {
  const structure: any = {};

  inputData.forEach((item) => {
    if (
      [
        TaskParamType.STRING,
        TaskParamType.AGENT_PROCESSING,
        TaskParamType.PROCESS_RESPONSE,
      ].includes(item.type)
    ) {
      structure.message = item.value;
    } else if (item.type === TaskParamType.IMAGE) {
      structure.image = { url: item.value, description: item.name };
    } else if (item.type === TaskParamType.BUTTON) {
      if (!structure.listOfButtons) {
        structure.listOfButtons = [];
      }

      structure.listOfButtons.push({
        title: item.name,
        id: item.targetNode || 'TARGET_NODE_NOT_FOUND',
      });
    }
  });

  if (sourceNode) {
    if (!structure.listOfButtons || structure.listOfButtons?.length === 0) {
      structure.listOfButtons = [];
    }
    structure.listOfButtons.push({
      title: 'Go back',
      id: sourceNode,
    });
  }

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
