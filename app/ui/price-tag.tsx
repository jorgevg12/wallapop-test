'use client';

export default function PriceTag({ price }: { price: string }) {
  return (
    <div 
      className='bg-gray-200 text-gray-800 font-semibold text-sm p-1 rounded-lg w-fit' 
      aria-label={`Price: €${price}`}
    >
      €{price}
    </div>
  );
}