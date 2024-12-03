'use client';
import { Workflow } from '@prisma/client';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import React, { DragEvent, useCallback, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/type/task';
import NodeComponent from './nodes/NodeComponent';
import { AppNode } from '@/type/appNode';
import DeletableEdge from './edges/DeletableEdge';
import { TaskRegistry } from '@/lib/workflow/task/registry';

interface FlowEditorProps {
  workflow: Workflow;
}

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

const FlowEditor = ({ workflow }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({
        x,
        y,
        zoom,
      });
    } catch (error) {}
  }, [setEdges, setNodes, setViewport, workflow.definition]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData('application/reactflow');
      if (typeof taskType === undefined || !taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = CreateFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  // const onConnect = useCallback(
  //   (connection: Connection) => {
  //     setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  //     if (!connection.targetHandle) return;
  //     // Remove input if is present on connection
  //     const node = nodes.find((nd) => nd.id === connection.target);

  //     if (!node) return;
  //     const nodeInputs = node.data.inputs;

  //   // updateNodeData(node.id, {
  //     //   inputs: {
  //     //     ...nodeInputs,
  //     //     targetNode: '',
  //     //   },
  //     // });
  //   },
  //   [setEdges, updateNodeData, nodes]
  // );

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log('Connection established:', connection);

      setEdges((eds) => {
        const newEdges = addEdge({ ...connection, animated: true }, eds);
        return newEdges;
      });

      if (!connection.targetHandle || !connection.sourceHandle) {
        return;
      }

      // Find the source node
      const sourceNode = nodes.find((nd) => nd.id === connection.source);

      if (!sourceNode) {
        return;
      }

      // Update the source node's inputs
      const updatedInputs = sourceNode.data.inputs.map((input) => {
        if (input.name === connection.sourceHandle) {
          return { ...input, targetNode: connection.target };
        }
        return input;
      });

      updateNodeData(sourceNode.id, {
        ...sourceNode.data,
        inputs: updatedInputs,
      });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No- self-connections allowed
      if (connection.source === connection.target) return false;

      // Same taskParam type conection
      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!source || !target) return false;

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs.find(
        (o) => o?.name == connection.sourceHandle
      );

      const input = targetTask.inputs.find(
        (i) => i?.name == connection.targetHandle
      );

      if (input?.type !== output?.type) {
        console.error('invalid connection: type mismatch');
        return false;
      }
      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      const detectedCycle = hasCycle(target);

      return !detectedCycle;
    },
    [edges, nodes]
  );

  return (
    <main className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        // isValidConnection={isValidConnection}
      >
        <Controls position='top-left' fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};

export default FlowEditor;
