import { Button } from '@/components/ui/button';
import { ParamProps } from '@/type/appNode';
import React, { useEffect } from 'react';

const ButtonParam = ({ param, updateNodeParamValue, value }: ParamProps) => {
  useEffect(() => {
    updateNodeParamValue(param.value!, param.type);
  }, []);

  return (
    <Button className='w-full' variant={'default'} key={value}>
      {param.name}
    </Button>
  );
};

export default ButtonParam;
