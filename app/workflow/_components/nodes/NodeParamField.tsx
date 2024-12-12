'use client ';
import { TaskParam, TaskParamType } from '@/type/task';
import React, { useCallback, useMemo } from 'react';
import StringParam from './param/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/type/appNode';
import BrowserInstanceParam from './param/BrowserInstanceParam';
import SelectParam from './param/SelectParam';
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
  const { updateNodeData, getNode } = useReactFlow();
  const nodeData = getNode(nodeId) as AppNode;

  // const value = node?.data?.inputs?.[param.name];
  const value = useMemo(() => {
    return (
      nodeData.data.inputs.find((nodeInput) => nodeInput.name === param.name)
        ?.value || ''
    );
  }, [nodeData.data.inputs, param.name]);

  const updateNodeParamValue = useCallback(
    (newValue: string, valueType: TaskParamType) => {
      updateNodeData(nodeId, (node: any) => {
        const updatedInputs = node.data.inputs.map((input: TaskParam) =>
          input.name === param.name
            ? { ...input, value: newValue, type: valueType }
            : input
        );

        // If the param doesn't exist, add it.
        const inputs = updatedInputs.some(
          (input: TaskParam) => input.name === param.name
        )
          ? updatedInputs
          : [
              ...updatedInputs,
              { value: newValue, type: valueType, name: param.name },
            ];

        return { ...node.data, inputs };
      });
    },
    [nodeId, param.name, updateNodeData]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={''}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BUTTON:
      return (
        <ButtonParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.IMAGE:
      return (
        <ImageParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.ORDER_INFO:
      return (
        <OrderInfoParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.AGENT_PROCESSING:
      return (
        <AgentProcessingParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={false}
        />
      );
    case TaskParamType.PROCESS_RESPONSE:
      return (
        <ProcessResponse
          param={param}
          updateNodeParamValue={updateNodeParamValue}
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
