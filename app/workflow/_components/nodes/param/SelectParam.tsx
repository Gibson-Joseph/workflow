'use client';
import { ParamProps } from '@/type/appNode';
import React, { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type OptionType = {
  label: string;
  value: string;
};

const SelectParam = ({ param, updateNodeParamValue, value }: ParamProps) => {
  const id = useId();
  return (
    <div className='flex flex-col gap-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <p className='text-red-400 px-2'>*</p>}
      </Label>
      <Select
        onValueChange={(value) => updateNodeParamValue(value, param.type)}
        value={value}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select an option' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {param.options.map((option: OptionType) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectParam;