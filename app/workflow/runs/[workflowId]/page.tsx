import { GetWrokflowExecutions } from '@/actions/workflows/GetWrokflowExecutions';
import Topbar from '../../_components/topbar/Topbar';
import { Suspense } from 'react';
import { InboxIcon, Loader2Icon } from 'lucide-react';
import { waitFor } from '@/lib/helper/waitFor';
import ExecutionsTable from './_components/ExecutionsTable';

export default function ExecutionsPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  return (
    <div className='h-full w-full overflow-auto'>
      <Topbar
        workflowId={workflowId}
        hideButtons
        title='All runs'
        subTitle='List of all your workflow runs'
      />
      <Suspense
        fallback={
          <div className='flex h-full w-full items-center justify-center'>
            <Loader2Icon size={30} className='animate-spin stroke-primary' />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWrokflowExecutions(workflowId);
  if (!executions) {
    return <div className=''>No data</div>;
  }
  if (executions.length == 0) {
    return (
      <div className='container w-full py-6'>
        <div className='flex items-center flex-col gap-2 justify-center h-full'>
          <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
            <InboxIcon size={40} className='stroke-primary' />
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <p className='font-bold'>
              No runs have been triggered yet for this workflow
            </p>
            <p className='text-sm text-muted-foreground'>
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container py-6 w-full'>
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}
