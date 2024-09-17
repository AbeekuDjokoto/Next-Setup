'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { getLabelValue } from '@/utils';

import { PromotionForm } from './promotion-form';

interface Props {
  // eslint-disable-next-line no-unused-vars
  closeModal: (...any: any) => any;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onCreatePromotion: (...any: any) => any;
  amenityTypes?: any;
}

function CreatePromotion({ closeModal, onCreatePromotion, isLoading, amenityTypes }: Props) {
  const onSubmit: SubmitHandler<{
    name: string;
    price: number;
    desc: string;
    duration: number;
  }> = (data) => {
    const obj = { ...data };
    obj.price = Number(data.price);
    obj.duration = Number(data.duration);
    onCreatePromotion(obj);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[550px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Promotion</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <PromotionForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export { CreatePromotion };
