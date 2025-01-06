import { memo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ParamProps } from '@/type/appNode';
import { DeleteIcon } from 'lucide-react';

const ButtonParam = ({
  param,
  addNodeParamValue,
  removeNodeParam,
}: ParamProps) => {
  const [internelValue, setInternelValue] = useState(param.name ?? '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    addNodeParamValue(newValue, param.type);
  };

  return (
    <div
      className={`w-full bg-purple-300 rounded-md border relative ${
        !internelValue && 'border-red-500'
      }`}
    >
      <DeleteIcon
        className='w-4 h-4 absolute top-1/4 right-1 z-10 text-red-700'
        onClick={() => removeNodeParam(param.id)}
      />
      <Input
        value={internelValue}
        onBlur={handleChange}
        onChange={(e) => setInternelValue(e.target.value)}
        className={`w-full bg-transparent font-normal text-xs ${
          !internelValue && 'focus-visible:ring-red-500'
        }`}
        placeholder='Enter your button name'
      />
    </div>
  );
};

export default memo(ButtonParam);
