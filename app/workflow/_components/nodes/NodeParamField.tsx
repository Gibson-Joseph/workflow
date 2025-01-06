'use client ';
import { TaskParam, TaskParamType } from '@/type/task';
import React, { useCallback, useMemo } from 'react';
import StringParam from './param/StringParam';
import { Node, useReactFlow } from '@xyflow/react';
import { AppNode } from '@/type/appNode';
import ButtonParam from './param/ButtonParam';
import ImageParam from './param/ImageParam';
import OrderInfoParam from './param/OrderInfoParam';
import AgentProcessingParam from './param/AgentProcessingParam';
import ProcessResponse from './param/ProcessResponse';

const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}) => {
  const { updateNodeData, getNode, getEdges, setEdges, setNodes } =
    useReactFlow();
  const nodeData = getNode(nodeId) as AppNode;

  // const value = node?.data?.inputs?.[param.name];
  const value = useMemo(() => {
    return nodeData.data.contant.find(
      (nodeContant) => nodeContant.id === param.id
    );
  }, [nodeData.data.contant, param.id]);

  const addNodeParamValue = useCallback(
    (newValue: string, valueType: TaskParamType) => {
      updateNodeData(nodeId, (node: Node) => {
        const updatedContents = (node as AppNode).data.contant.map(
          (contant: TaskParam) =>
            contant.id === param.id
              ? {
                  ...contant,
                  ...(valueType === TaskParamType.BUTTON
                    ? { name: newValue }
                    : { value: newValue }),
                }
              : contant
        );

        return { ...node.data, contant: updatedContents };
      });
    },
    [nodeId, param, updateNodeData]
  );

  const removeNodeParam = useCallback(
    (contantId: number) => {
      setNodes((nodes) => {
        const updatedNodes = nodes.map((node: Node) => {
          // Update content for the current node
          if (node.id === nodeId) {
            const updatedContents = (node as AppNode).data.contant.filter(
              (contant: TaskParam) => contant.id !== contantId
            );
            return {
              ...node,
              data: {
                ...node.data,
                contant: updatedContents,
              },
            };
          }

          // Remove the reference to the source node for other nodes
          if (node.data?.sourceNode === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                sourceNode: null,
              },
            };
          }

          return node;
        });
        return updatedNodes;
      });

      // Remove edges associated with the node
      setEdges((edges) => {
        const filteredEdges = edges.filter((edge) => edge.source !== nodeId);
        return filteredEdges;
      });
    },
    [nodeId, setEdges, setNodes]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value?.value || ''}
          addNodeParamValue={addNodeParamValue}
          disabled={disabled}
          removeNodeParam={removeNodeParam}
        />
      );
    case TaskParamType.BUTTON:
      return (
        <ButtonParam
          param={param}
          value={value?.value || ''}
          addNodeParamValue={addNodeParamValue}
          removeNodeParam={removeNodeParam}
          disabled={disabled}
        />
      );
    case TaskParamType.IMAGE:
      return (
        <ImageParam
          param={param}
          value={value?.value || ''}
          addNodeParamValue={addNodeParamValue}
          removeNodeParam={removeNodeParam}
          disabled={disabled}
        />
      );
    case TaskParamType.ORDER_INFO:
      return (
        <OrderInfoParam
          param={param}
          value={value?.value || ''}
          addNodeParamValue={addNodeParamValue}
          removeNodeParam={removeNodeParam}
          disabled={disabled}
        />
      );
    case TaskParamType.AGENT_PROCESSING:
      return (
        <AgentProcessingParam
          param={param}
          value={value?.value || ''}
          addNodeParamValue={addNodeParamValue}
          removeNodeParam={removeNodeParam}
          disabled={false}
        />
      );
    case TaskParamType.PROCESS_RESPONSE:
      return (
        <ProcessResponse
          param={param}
          addNodeParamValue={addNodeParamValue}
          removeNodeParam={removeNodeParam}
          value=''
          disabled={false}
        />
      );
    default:
      return (
        <div className='w-full'>
          <p className='text-xs text-muted-foreground'>Not imlemented</p>
        </div>
      );
  }
};

export default NodeParamField;
