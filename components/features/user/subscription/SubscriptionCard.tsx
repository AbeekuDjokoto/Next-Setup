import { Button } from '@/components/shared';
import { formatCurrency } from '@/utils';

interface Props {
  isFree?: boolean;
  openModal: any;
}
export function SubscriptionCard({ isFree, openModal }: Props) {
  return (
    <div className="flex justify-between max-w-[450px] p-6 border rounded-md">
      <div>
        <div className="flex items-center gap-2 ">
          <div className="bg-blue-950 text-white py-1 px-2 text-xs rounded">PRO</div>
          Plan
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex">
          <strong className="text-4xl">{isFree ? 'free' : formatCurrency(175, 0, 'GHC')}</strong>
          <p className="text-gray-500 text-xs">/month</p>
        </div>

        <Button onClick={openModal}>Upgrade Plan</Button>
      </div>
    </div>
  );
}
