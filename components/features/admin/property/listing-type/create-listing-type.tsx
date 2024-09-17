'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { ListingTypeForm } from './listing-type-form';

interface Props {
  closeModal: (...any: any) => any;
  isLoading: boolean;
  selectedType?: any;
  onCreateListingType: (...any: any) => any;
}

export function CreateListingType({ closeModal, onCreateListingType, isLoading }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreateListingType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Listing Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <ListingTypeForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
