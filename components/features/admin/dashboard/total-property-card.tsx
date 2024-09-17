import { Progress } from '@/components/shared';

import PropertyIcon from '@/public/assets/icons/house-solid.svg';

export function TotalPropertyCard() {
  return (
    <div className="bg-[#FF6746] p-8 flex gap-4 items-center rounded-xl">
      <PropertyIcon className="text-white w-[60px] h-[60px]" />
      <div className="grow grid gap-4 text-white">
        <h3 className="text-lg">Total Properties</h3>
        <div className="grid gap-2">
          <Progress value={33} />
          <p className="text-xs">431 more to break last month record</p>
        </div>
      </div>
      <p className="text-5xl text-white font-medium">4570</p>
    </div>
  );
}

export function RentSaleCard({ variant, total }: { variant: string; total: number }) {
  return (
    <div className="flex justify-between items-center w-full border border-gray-100 p-8 shadow-md rounded-xl">
      <div className="grid gap-2">
        <h3 className="text-4xl font-bold">{total}</h3>
        <div>
          <p className="text-lg">Properties for {variant === 'sale' ? 'Sale' : 'Rent'} </p>
          <p className="text-xs text-gray-500">Target 3k/month</p>
        </div>
      </div>
      <div className="h-[100px] w-[100px] bg-blue-200"></div>
    </div>
  );
}
