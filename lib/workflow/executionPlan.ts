import { AppNode, AppNodeMissingInputs } from '@/type/appNode';
import {
  WorkflowExectionPlan,
  WorkflowExectionPlanPhase,
} from '@/type/workflow';
import { Edge } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

export enum FlowToExecutionPlanValidationError {
  'NO_ENTRY_POINT',
  'INVALID_INPUTS',
}

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExectionPlan;
  error?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  console.log('nodes --->>>>', JSON.stringify(nodes, null, 4));
  console.log('edges --->>>>', JSON.stringify(edges, null, 4));

  const entrypoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );
  console.log('entry point -->>>', JSON.stringify(entrypoint, null, 4));

  if (!entrypoint) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const planned = new Set<string>();
  const inputsWithErrors: AppNodeMissingInputs[] = [];

  const invalidInputs = getInvalidInputs(entrypoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entrypoint.id,
      inputs: invalidInputs,
    });
  }
  const executionPlan: WorkflowExectionPlan = [
    {
      phase: 1,
      nodes: [entrypoint],
    },
  ];
  console.log('executionPlan', JSON.stringify(executionPlan, null, 4));

  planned.add(entrypoint.id);

  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExectionPlanPhase = {
      phase,
      nodes: [],
    };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already put in the executation plan
        continue;
      }
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        console.log('incommers', incomers);

        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // If all incoming incomers/edges are planned and there are still invalid inputs
          // this means that this particular node has an invalid input
          // which means that the workflow is invalid

          console.error('invalid inputs', currentNode.id, invalidInputs);
          inputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs,
          });
        } else {
          // Lets's skip this node for now
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
  }

  return { executionPlan };
}

function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    console.log('input from the get invalid inputs', input);

    // const inputValue = node.data.inputs[input.name];
    const inputValue =
      node.data.inputs.find((nodeInput) => nodeInput.name === input.name)
        ?.value || '';

    const inputValueProvider = inputValue?.length > 0;

    if (inputValueProvider) {
      // this input is fine, so we can move on
      continue;
    }
    // if a value is not provided by the user then we need to check
    // If there is an output linked ot the current input

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const inputLInkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisistedOutput =
      input.required &&
      inputLInkedToOutput &&
      planned.has(inputLInkedToOutput.source);

    if (requiredInputProvidedByVisistedOutput) {
      // thte inputs s required and we have a valid value for it
      // provided by a task that is already planned
      continue;
    } else if (!input.required) {
      // If the input is not required  but there is an output linked to it
      // then we need to be sure that the output is already planned
      if (!inputLInkedToOutput) continue;
      if (inputLInkedToOutput && planned.has(inputLInkedToOutput.source)) {
        // The output is providing a value to the input: the input is fine
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
  if (!node.id) {
    return [];
  }
  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });

  return nodes.filter((n) => incomersIds.has(n.id));
}
