'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { AmenityForm } from './amenity-form';
import { getLabelValue } from '@/utils';

interface Props {
  closeModal: (...any: any) => any;
  isLoading: boolean;
  onEditAmenity: (...any: any) => any;
  selectType?: any;
  amenityTypes?: any;
}

export function EditAmenity({
  closeModal,
  onEditAmenity,
  selectType,
  isLoading,
  amenityTypes,
}: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onEditAmenity(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Amenity</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <AmenityForm
        onHandleSubmit={onSubmit}
        isLoading={isLoading}
        amenityTypes={getLabelValue(amenityTypes)}
        amenity={selectType}
      />
    </div>
  );
}
