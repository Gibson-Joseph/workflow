'use client';
import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/GetWorkflowExecutionWithPhases';
import { GetWorkflowPhasesDetails } from '@/actions/workflows/GetWorkflowPhaseDetails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DatesToDurationString } from '@/lib/helper/date';
import { GetPhasesTotalCose } from '@/lib/helper/phases';
import { WorkflowExecutionStatus } from '@/type/workflow';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  CalculatorIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from 'lucide-react';
import React, { ReactNode, useState } from 'react';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['execution', initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });
  const phaseDetails = useQuery({
    queryKey: ['phaseDeails', selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhasesDetails(selectedPhase!),
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;
  const duration = DatesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt
  );
  const creditsConsumed = GetPhasesTotalCose(query.data?.phase || []);
  return (
    <div className='flex w-full h-full'>
      <aside className='w-[400px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
        <div className='py-4 px-2'>
          {/* Status label */}
          <ExecutionLabel
            icon={CircleDashedIcon}
            lable='Status'
            value={query.data?.status}
          />

          {/* Started at label */}
          <ExecutionLabel
            icon={CalculatorIcon}
            lable='Started at'
            value={
              <span className='lowercase'>
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : '_'}
              </span>
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            lable='Duration'
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className='animate-spin' size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            lable='Creadits consumed'
            value={creditsConsumed}
          />
        </div>
        <Separator />
        <div className='flex justify-center items-center py-2 px-4'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <WorkflowIcon size={20} className='stroke-muted-foreground/80' />
            <span className='font-semibold'>Phases</span>
          </div>
        </div>
        <Separator />
        <div className='overflow-auto h-full px-2 py-4'>
          {query.data?.phase.map((phase, index) => (
            <Button
              key={index}
              className='w-full justify-between'
              variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
              onClick={() => {
                if (isRunning) return;
                setSelectedPhase(phase.id);
              }}
            >
              <div className='flex items-center gap-2'>
                <Badge variant={'outline'}>{index + 1}</Badge>
                <p className='font-semibold'>{phase.name}</p>
              </div>
              <p className='text-xs text-muted-foreground'>{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
      <div className='flex w-full h-full'>
        <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
      </div>
    </div>
  );
};

export default ExecutionViewer;

function ExecutionLabel({
  icon,
  lable,
  value,
}: {
  icon: LucideIcon;
  lable: ReactNode;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className='flex justify-between items-center py-2 px-4 gap-2 text-sm'>
      <div className='text-muted-foreground flex items-center gap-2'>
        <Icon size={20} className='stroke-muted-foreground' />
        <span className=''>{lable}</span>
      </div>
      <div className='font-semibold capitalize flex gap-2 items-center'>
        {value}
      </div>
    </div>
  );
}
