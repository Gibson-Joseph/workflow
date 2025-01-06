import { ParamProps } from '@/type/appNode';

const OrderInfoParam = ({ param }: ParamProps) => {
  return (
    <div className='p-2 border border-gray-300 rounded bg-gray-50'>
      <p className='text-sm font-medium text-gray-700'>
        {param.label || 'Order Information'}
      </p>
      {/* Static placeholder data */}
      <ul className='list-disc list-inside'>
        <li>
          Order ID: <span className='text-gray-900 font-medium'>#12345</span>
        </li>
        <li>
          Status: <span className='text-green-600 font-medium'>Shipped</span>
        </li>
        <li>
          Estimated Delivery: <span className='text-gray-800'>Dec 5, 2024</span>
        </li>
      </ul>
      {/* Optional: Show a note about placeholder */}
      <p className='mt-2 text-xs text-gray-500 italic'>
        Placeholder data - Actual information will be fetched from the server.
      </p>
    </div>
  );
};

export default OrderInfoParam;
