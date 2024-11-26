import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/GetWorkflowExecutionWithPhases';
import Topbar from '@/app/workflow/_components/topbar/Topbar';
import { auth } from '@clerk/nextjs/server';
import { Loader2Icon } from 'lucide-react';
import React, { Suspense } from 'react';
import ExecutionViewer from './_components/ExecutionViewer';

const ExecutionViewerPage = ({
  params,
}: {
  params: {
    executionId: string;
    workflowId: string;
  };
}) => {
  const { executionId, workflowId } = params;
  return (
    <div className='flex flex-col h-screen w-full overflow-hidden'>
      <Topbar
        workflowId={workflowId}
        title='Workflow run details'
        subTitle={`Run ID: ${executionId}`}
        hideButtons
      />
      <section className='flex h-full overflow-auto'>
        <Suspense
          fallback={
            <div className='flex w-full items-center justify-center'>
              <Loader2Icon className='h-10 w-10 animate-spin stroke-primary' />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExection = await GetWorkflowExecutionWithPhases(executionId);

  if (!workflowExection) {
    return <div>Not Found</div>;
  }
  return <ExecutionViewer initialData={workflowExection} />;
}
