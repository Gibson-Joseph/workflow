import React, { useId } from 'react';
import { ParamProps } from '@/type/appNode';
import { Loader2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AgentProcessingParam = ({
  param,
  addNodeParamValue,
  value,
  disabled,
}: ParamProps) => {
  const id = useId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    addNodeParamValue(newValue, param.type);
  };

  return (
    <div className='w-full p-6 rounded-xl shadow-lg bg-white space-y-4'>
      {/* Header with Icon */}
      <div className='flex items-center space-x-3'>
        <div className='w-6 h-6 flex justify-center items-center rounded-full bg-blue-200'>
          <Loader2Icon className='animate-spin text-blue-500' size={24} />
        </div>
        <h3 className='text-sm font-semibold text-gray-800'>
          Agent Request Submitted
        </h3>
      </div>

      {/* Status Section */}
      <div className='flex flex-col gap-y-2'>
        <Label htmlFor={id} className='text-xs flex'>
          {param.name}
          {param.required && <p className='text-red-400 px-2'>*</p>}
        </Label>
        <Input
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          placeholder='Our team will get in touch with you soon!'
          className='text-xs'
        />
      </div>
    </div>
  );
};

export default AgentProcessingParam;
