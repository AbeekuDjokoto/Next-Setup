import React from 'react';
import { Modal, Button } from '@/components/shared';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { useSubscription } from '@/hooks/admin';
import { SubscriptionPlanCard } from '@/components/features/user';
import { CubicLoader } from '../Loaders';

function UpgradePremium() {
  const [showModal, setShowModal] = React.useState(false);
  const { data, isLoadingSubscriptions } = useSubscription();

  return (
    <>
      <div className="m-4 bg-white rounded-md">
        <div className="rounded-2xl w-[210px] p-2 grid gap-4 shadow">
          <div className="text-blue-900">
            <div className="text-lg font-medium">Upgrade to Premium</div>
            <div className="text-xs">and post more Properties</div>
          </div>
          <Button onClick={() => setShowModal(true)}>Upgrade</Button>
        </div>
      </div>

      <Modal show={showModal} hideModal={() => setShowModal(false)}>
        <div className="grid gap-6 bg-white p-6 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Subscriptions</h2>

            <CloseIcon onClick={() => setShowModal(false)} className="cursor-pointer" />
          </div>

          <p className="max-w-xl text-gray-500 text-sm">
            Here are the plans, our Free Plan lets you get going right away. Switch to a Pro plan to
            post more listings, get analytics, and more.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center py-6">
            {isLoadingSubscriptions ? (
              <CubicLoader />
            ) : (
              <>
                {data?.map((plan) => {
                  return <SubscriptionPlanCard key={plan.id} name={plan.name} price={plan.price} />;
                })}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export { UpgradePremium };
