'use client';
import React, { useId, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ParamProps } from '@/type/appNode';

const StringParam = ({
  value,
  param,
  disabled,
  addNodeParamValue,
}: ParamProps) => {
  const id = useId();
  const [internelValue, setInternelValue] = useState(value);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    addNodeParamValue(newValue, param.type);
  };

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
        value={internelValue}
        onBlur={handleChange}
        onChange={(e: any) => setInternelValue(e.target.value)}
        disabled={disabled}
        className={`text-xs border ${
          !internelValue &&
          'border-red-500 focus-visible:border-transparent focus-visible:ring-red-500'
        } `}
        placeholder='Enter a value here'
      />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
