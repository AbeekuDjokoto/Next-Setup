'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { SubscriptionForm } from './subscription-form';

interface Subscription {
  name: string;
  price: number;
  desc: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  closeModal: (...any: any) => any;
  onHandleSubmit: any;
  isLoading: boolean;
}

function CreateSubscription({ closeModal, onHandleSubmit, isLoading }: Props) {
  const onSubmit: SubmitHandler<Subscription> = (data) => {
    onHandleSubmit(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[550px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Subscription</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <SubscriptionForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export { CreateSubscription };
