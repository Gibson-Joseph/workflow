'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParamProps } from '@/type/appNode';
import React, { useId, useState } from 'react';

const StringParam = ({ param, updateNodeParamValue, value }: ParamProps) => {
  const id = useId();
  const [internelValue, setInternelValue] = useState(value);
  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-400 px-2'>*</p>}
      </Label>
      <Input
        id={id}
        value={internelValue}
        onChange={(e) => setInternelValue(e.target.value)}
        placeholder='Enter value here'
        onBlur={(e) => updateNodeParamValue(e.target.value)}
        className='text-xs'
      />
      {param.helperText && (
        <p className='text-muted-foreground px-2'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
