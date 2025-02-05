'use client';

import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CalculatorIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { updateWorkflowCron } from '@/actions/workflows/updateWorkflowCron';
import { toast } from 'sonner';
import cronstrue from 'cronstrue';
import parser from 'cron-parser';
import { RemoveWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule';
import { Separator } from '@/components/ui/separator';

const SchedulerDialog = (props: {
  workflowId: string;
  cron: string | null;
}) => {
  const [cron, setCron] = useState(props.cron || '');
  const [valideCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState('');

  const mutation = useMutation({
    mutationFn: updateWorkflowCron,
    onSuccess: () => {
      toast.success('Schedule updated successfully', { id: 'cron' });
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'cron' });
    },
  });

  const removeSchedulerMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success('Schedule updated successfully', { id: 'cron' });
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'cron' });
    },
  });

  useEffect(() => {
    try {
      parser.parseExpression(cron);
      const humanCronStr = cronstrue.toString(cron);
      setReadableCron(humanCronStr);
      setValidCron(true);
    } catch (error) {
      setValidCron(false);
    }
  }, [cron]);

  const workflowHasValidCron = props.cron && props.cron.length > 0;
  const readableSavedCron =
    workflowHasValidCron && cronstrue.toString(props.cron!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          size={'sm'}
          className={cn(
            'text-sm p-0 h-auto text-orange-500',
            workflowHasValidCron && 'text-primary'
          )}
        >
          {workflowHasValidCron && (
            <div className='flex items-center gap-2'>
              <ClockIcon />
              {readableSavedCron}
            </div>
          )}
          {!workflowHasValidCron && (
            <div className='flex items-center gap-1'>
              <TriangleAlertIcon className='h-3 w-3 ' />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          title='Schedule workflow execution'
          icon={CalculatorIcon}
        />
        <div className='p-6 space-y-4'>
          <p className='text-muted-foreground text-sm'>
            Specif a cron expression to schedule periodic workflow execuion. All
            times are in UTC
          </p>
          <Input
            placeholder='E.g. * * * * *'
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          <div
            className={cn(
              'bg-accent rounded-md p-4 border text-sm border-destructive text-destructive',
              valideCron && 'border-primary text-primary'
            )}
          >
            {valideCron ? readableCron : 'Not a valid cron expression'}
          </div>

          {workflowHasValidCron && (
            <DialogClose asChild>
              <div className=''>
                <Button
                  className='w-full text-destructive border-destructive hover:text-destructive'
                  variant={'outline'}
                  disabled={
                    mutation.isPending || removeSchedulerMutation.isPending
                  }
                  onClick={() => {
                    toast.loading('Rmoving schedule...', { id: 'cron' });
                    removeSchedulerMutation.mutate(props.workflowId);
                  }}
                >
                  Remove current schedule
                </Button>
                <Separator className='my-4' />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className='px-6 gap-2'>
          <DialogClose asChild>
            <Button className='w-full' variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={mutation.isPending || !valideCron}
              className='w-full'
              onClick={() => {
                toast.loading('Saving...', { id: cron });
                mutation.mutate({
                  id: props.workflowId,
                  cron,
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulerDialog;
