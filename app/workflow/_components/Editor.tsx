'use client';

import { workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import Topbar from './topbar/Topbar';
interface EditorProps {
  workflow: workflow;
}

const Editor = ({ workflow }: EditorProps) => {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <Topbar
          title={'Workflow editor'}
          subTitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className='flex h-full overflow-auto'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
