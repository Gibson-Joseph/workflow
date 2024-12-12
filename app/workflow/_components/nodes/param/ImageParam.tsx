import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ParamProps } from '@/type/appNode';
import Image from 'next/image';

const ImageParam = ({ param, updateNodeParamValue, value }: ParamProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateNodeParamValue(newValue, param.type);
  };

  const clearImageUrl = () => {
    updateNodeParamValue('', param.type);
  };

  return (
    <div className='w-full h-full space-y-2 flex flex-col'>
      {/* Image Preview */}
      <div className='relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden shadow-sm'>
        {value ? (
          <Image
            src={value}
            alt='Selected image'
            className='w-full h-full object-cover'
            fill
          />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            No image selected
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className='p-4 bg-white rounded-lg shadow-md space-y-1'>
        <label
          htmlFor='image-url'
          className='block text-xs font-medium text-gray-700'
        >
          Image URL
        </label>
        <div className='flex items-center gap-2'>
          <Input
            id='image-url'
            value={value}
            onChange={handleChange}
            placeholder='Enter image URL'
            className='flex-1 border border-gray-300 !text-xs rounded-md px-3 py-0.5 shadow-sm focus:ring-blue-500 focus:border-blue-500'
          />
          <Button
            onClick={clearImageUrl}
            variant='outline'
            size='sm'
            className='text-xs bg-red-100 text-red-600 border border-red-200 rounded-md hover:bg-red-200'
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageParam;
