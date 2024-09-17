'use client';
import React from 'react';

import { Modal } from '@/components/shared';
import { SubscriptionCard, SubscriptionPlanCard } from '@/components/features/user';
import { useSubscription } from '@/hooks/admin';
import { useAuthStore } from '@/stores';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { CubicLoader } from '@/components/shared/Loaders';

export default function Subscriptions() {
  const [showModal, setShowModal] = React.useState(false);
  const { data, isLoadingSubscriptions } = useSubscription();
  const { user } = useAuthStore();

  return (
    <>
      <div className="grid py-6 gap-10">
        <SubscriptionCard openModal={() => setShowModal(true)} />
      </div>

      <Modal show={showModal} hideModal={() => setShowModal(false)}>
        <div className="grid gap-6 bg-white p-6 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Subscriptions</h2>

            <CloseIcon onClick={() => setShowModal(false)} className="cursor-pointer" />
          </div>

          <p className="max-w-xl text-gray-500 text-sm">
            Here are the plans, {user?.firstname}! Our Free Plan lets you get going right away.
            Switch to a Pro plan to post more listings, get analytics, and more.
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
