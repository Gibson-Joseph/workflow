'use client';
import React from 'react';
import { DialogHeader, DialogTitle } from './ui/dialog';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';
interface DialogHeaderProps {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}
const CustomDialogHeader = ({
  icon,
  subTitle,
  title,
  iconClassName,
  subTitleClassName,
  titleClassName,
}: DialogHeaderProps) => {
  const Icon = icon;
  return (
    <DialogHeader>
      <DialogTitle asChild>
        <div className='flex flex-col items-center gap-2 mb-2'>
          {Icon && (
            <Icon size={30} className={cn('stroke-primary', iconClassName)} />
          )}
          {title && (
            <p className={cn('text-xl text-primary', titleClassName)}>
              {title}
            </p>
          )}
          {subTitle && (
            <p
              className={cn('text-sm text-muted-foreground', subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
