'use client';

import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from './FlowEditor';
import Topbar from './topbar/Topbar';
import TaskMenu from './TaskMenu';
import { FlowVAlidaationContextPrvider } from '@/components/context/FlowValidationContext';
import { workflowStatus } from '@/type/workflow';
interface EditorProps {
  workflow: Workflow;
}

const Editor = ({ workflow }: EditorProps) => {
  return (
    <FlowVAlidaationContextPrvider>
      <ReactFlowProvider>
        <div className='flex flex-col h-full w-full overflow-hidden'>
          <Topbar
            title={'Workflow editor'}
            subTitle={workflow.name}
            workflowId={workflow.id}
            isPublished={workflow.status === workflowStatus.PUBLISHED}
          />
          <section className='flex h-full overflow-auto'>
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowVAlidaationContextPrvider>
  );
};

export default Editor;
