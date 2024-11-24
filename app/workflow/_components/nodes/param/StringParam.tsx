'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/type/appNode';
import React, { useEffect, useId, useState } from 'react';

const StringParam = ({
  param,
  updateNodeParamValue,
  value,
  disabled,
}: ParamProps) => {
  const id = useId();
  const [internelValue, setInternelValue] = useState(value);

  useEffect(() => {
    setInternelValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === 'textarea') {
    Component = Textarea;
  }

  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-400 px-2'>*</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        value={internelValue}
        onChange={(e: any) => setInternelValue(e.target.value)}
        placeholder='Enter value here'
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
        className='text-xs'
      />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
