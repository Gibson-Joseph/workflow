import React, { useEffect, useState } from 'react';
import { ParamProps } from '@/type/appNode';
import { Loader2Icon } from 'lucide-react';

const AgentProcessingParam = ({
  param,
  updateNodeParamValue,
  value,
}: ParamProps) => {
  const [message, setMessage] = useState(param.value);

  useEffect(() => {
    if (message) updateNodeParamValue(message, param.type);
  }, [message]);

  return (
    <div className='node-card p-6 rounded-xl shadow-lg bg-white'>
      {/* Header with Icon */}
      <div className='flex items-center space-x-3'>
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-blue-200'>
          <Loader2Icon className='animate-spin text-blue-500' size={24} />
        </div>
        <h3 className='text-sm font-semibold text-gray-800'>
          Agent Request Submitted
        </h3>
      </div>

      {/* Status Section */}
      <div className='mt-4'>
        <p className='text-xs text-gray-600'>
          Our team will get in touch with you soon!
        </p>

        {/* Loading Indicator */}
        <div className='flex flex-col items-center space-y-2 mt-4'>
          <div className='w-full h-2 bg-gray-200 rounded-full'>
            <div
              className='h-full bg-blue-500 animate-pulse'
              style={{ width: '60%' }}
            ></div>{' '}
            {/* Dynamic progress bar */}
          </div>
          <p className='text-xs text-gray-500 mt-2'>
            Your request is being processed...
          </p>
        </div>

        {/* Subtext and Information */}
        <p className='text-xs text-gray-500 mt-4'>{message}</p>
      </div>

      {/* Footer with Actions */}
      {/*<div className='mt-6 flex justify-between'>
        <button
          className='px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition'
          onClick={() => console.log('Contact Support clicked')}
        >
          Contact Support
        </button>
        <Badge variant='outline' color='blue' className='text-xs'>
          Pending
        </Badge>
      </div> */}
    </div>
  );
};

export default AgentProcessingParam;
