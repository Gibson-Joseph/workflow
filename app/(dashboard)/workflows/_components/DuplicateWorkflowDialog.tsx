'use client';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from '@/schema/workflow';
import { CopyIcon, Layers2Icon, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DuplicateWorkflow } from '@/actions/workflows/duplicateWorkflow';
import { cn } from '@/lib/utils';

const DuplicateWorkflowDialog = ({ workflowId }: { workflowId?: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<duplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: DuplicateWorkflow,
    onSuccess: () => {
      toast.success('Workflow duplicated', { id: 'duplicate-workflow' });
      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error('Failed to duplicate workflow', {
        id: 'duplicate-workflow',
      });
    },
  });

  const onSubmit = useCallback(
    (values: duplicateWorkflowSchemaType) => {
      toast.loading('Duplicating workflow...', { id: 'duplicate-workflow' });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className={cn(
            'ml-2 transition-opacity duration-200 opacity-0 group-hover/card:opacity-100'
          )}
        >
          <CopyIcon className='w-4 h-4 text-muted-foreground cursor-pointer' />
        </Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader icon={Layers2Icon} title='Duplicate workflow' />
        <div className='p-6'>
          <Form {...form}>
            <form
              className='space-y-8 w-full'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-x-1'>
                      Name <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <p className='text-xs text-primary'>(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a bried description of waht your workflow does.{' '}
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={isPending} className='w-full'>
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className='animate-spin' />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateWorkflowDialog;