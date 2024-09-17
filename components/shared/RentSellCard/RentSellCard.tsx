import { RentIcon, SaleIcon } from '@/public/assets/icons';
import { formatCurrency } from '@/utils';

type Props = Readonly<{
  type?: string;
  price?: number;
  currency: 'GHC' | 'USD';
}>;
function RentSellCard({ type, price, currency }: Props) {
  return (
    <div className="grid  gap-6 rounded-md w-full max-w-md bg-whitepy-3 max-h-[80px] border py-4">
      <div className="flex flex-col justify-center items-center text-blue-900">
        {type === 'FOR RENT' && (
          <div className="flex items-center font-bold gap-2 uppercase text-xl">
            <RentIcon className="w-6 h-6" />
            For Rent
          </div>
        )}
        {type === 'FOR SALE' && (
          <div className="flex items-center font-bold gap-2 uppercase text-xl">
            <SaleIcon className="w-6 h-6" />
            For Sale
          </div>
        )}
        <p className="font-bold text-lg">{formatCurrency(price, 2, currency)}</p>
      </div>
    </div>
  );
}

export { RentSellCard };
