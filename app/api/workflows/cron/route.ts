import { getAppUrl } from '@/lib/helper/appUrl';
import prisma from '@/lib/prisma';
import { workflowStatus } from '@/type/workflow';
// 10:13:45
export async function GET() {
  const now = new Date();
  const workflows = await prisma.workflow.findMany({
    where: {
      status: workflowStatus.PUBLISHED,
      // cron: { not: null },
      // nextRunAt: { lte: now },
    },
    select: { id: true },
  });

  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}

async function triggerWorkflow(workflowId: string) {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET!}`,
    },
    cache: 'no-store',
    // signal: AbortSignal.timeout(5000),
  }).catch((error) => {
    console.log(
      'Error triggering workflow with id',
      workflowId,
      ':error->',
      error.message
    );
  });

  console.log('triggerApiUrl', triggerApiUrl);
}
