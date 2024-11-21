'use client';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { toast } from 'sonner';
interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}
const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowName,
  workflowId,
}: DeleteWorkflowDialogProps) => {
  const [confirmText, setConfirmText] = useState('');
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow delete successfully', { id: workflowId });
      setConfirmText('');
    },
    onError: () => {
      toast.error('Something went wrong', { id: workflowId });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not able to recover it.
            <div className='flex flex-col py-4 gap-2'>
              <p className=''>
                If you are sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={(e) => {
              toast.loading('Delte workflow...', { id: workflowId });
              deleteMutation.mutate(workflowId);
            }}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90
            '
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
