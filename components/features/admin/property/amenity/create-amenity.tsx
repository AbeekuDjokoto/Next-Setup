'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { getLabelValue } from '@/utils';

import { AmenityForm } from './amenity-form';

interface Props {
  // eslint-disable-next-line no-unused-vars
  closeModal: (...any: any) => any;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onCreateType: (...any: any) => any;
  amenityTypes?: any;
}

function CreateAmenity({ closeModal, onCreateType, isLoading, amenityTypes }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreateType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[550px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Amenity</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <AmenityForm
        onHandleSubmit={onSubmit}
        isLoading={isLoading}
        amenityTypes={getLabelValue(amenityTypes)}
      />
    </div>
  );
}

export { CreateAmenity };
