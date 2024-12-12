'use client';
import { ParamProps } from '@/type/appNode';
import React from 'react';

const ProcessResponse = ({ param }: ParamProps) => {
  return <p className='text-xs'>{param.name}</p>;
};

export default ProcessResponse;
