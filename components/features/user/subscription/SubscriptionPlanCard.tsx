import { Button } from '@/components/shared';
import { useHostSubscription } from '@/hooks/user';
import { useAuthStore } from '@/stores';
import { formatCurrency } from '@/utils';
import React from 'react';

interface Props {
  desc?: string;
  id?: number;
  listing?: number;
  name?: string;
  price?: number;
}

export function SubscriptionPlanCard({ name, price, desc }: Props) {
  const { user } = useAuthStore();
  const userDetails = user!;
  const { initPayment } = useHostSubscription();

  const [checkoutUrl, setCheckoutUrl] = React.useState<string>('');

  const onSubmit = () => {
    const res = initPayment({
      subscription_id: 72922294,
    });
    // console.log(res)

    // res.authorization_url && setCheckoutUrl(res.authorization_url);
  };

  return (
    <div className="max-w-[300px] rounded-md border p-6 grid gap-10 hover:scale-105 ease-linear duration-250 bg-white">
      <div className="grid gap-6">
        <div className="text-lg flex flex-col items-center gap-2">
          <h3 className="font-light">{name}</h3>
          <p className="text-2xl font-bold">
            {formatCurrency(price || 0, 0, 'GHC')}
            <span className="text-sm text-gray-500 font-normal">/month</span>
          </p>
        </div>

        <ul className="flex flex-col gap-2 text-xs text-gray-700">
          <li>Access to Basic Content</li>
          <li>Limited Weekly Videos</li>
          <li>Basic Community Access</li>
        </ul>
      </div>
      <Button onClick={onSubmit}>Try now</Button>

      <iframe src={checkoutUrl} frameBorder="0"></iframe>
    </div>
  );
}
