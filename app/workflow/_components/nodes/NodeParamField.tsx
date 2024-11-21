'use client ';
import { TaskParam, TaskParamType } from '@/type/task';
import React from 'react';
import StringParam from './param/StringParam';

const NodeParamField = ({ param }: { param: TaskParam }) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <StringParam param={param} />;
    default:
      return (
        <div className='w-full'>
          <p className='text-xs text-muted-foreground'>Not imlemented</p>
        </div>
      );
  }
};

export default NodeParamField;
