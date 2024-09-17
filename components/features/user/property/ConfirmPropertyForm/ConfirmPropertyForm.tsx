'use client';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { useCreatePropertyStore } from '@/stores';
import { DEFAULT_LOCATION_COORDINATES } from '@/utils';
import React from 'react';
import { useCreateProperty } from '@/hooks/user';
import { Icons, Map, Button } from '@/components/shared';
import { PropertyLabel } from '@/components/shared/PropertyLabel';
import { RentIcon, SaleIcon } from '@/public/assets/icons';

interface Props {
  closeModal: () => void;
  openModal: (contentType: string) => void;
  defaultAmenities: any;
}
function ConfirmPropertyForm({ closeModal, openModal, defaultAmenities }: Props) {
  const {
    leasing,
    listing,
    propertyType,
    unitNumber,
    streetAddress,
    propertyName,
    location,
    onAddDefaultAmenities,
  } = useCreatePropertyStore();

  const { onCreateProperty, isLoading } = useCreateProperty();

  const coordinates = React.useMemo(
    () => ({
      lat: location.latitude || DEFAULT_LOCATION_COORDINATES.lat,
      lng: location.longitude || DEFAULT_LOCATION_COORDINATES.lng,
    }),
    [location.street],
  );

  function onSubmit(e: any) {
    e.preventDefault();
    let initialPropertyData = {
      location,
      type: propertyType,
      name: propertyName,
      leasing,
      unitNumber: Number(unitNumber),
      streetAddress: location.street,
    };

    onCreateProperty(initialPropertyData);
    onAddDefaultAmenities(defaultAmenities);
  }
  return (
    <form className="bg-white rounded-md max-sm:w-[380px] sm:w-[550px] md:w-[650px] lg:w-[750px] max-h-[85vh] overflow-y-auto relative">
      <div className="flex justify-between items-center p-6 border border-b-gray-200 sticky top-0 bg-white">
        <h3 className="text-2xl font-bold">Property Manager</h3>
        <CloseIcon onClick={closeModal} className="cursor-pointer" />
      </div>
      <div className="grid gap-2 p-6">
        <h3 className="text-2xl font-semibold">Is the information complete and correct?</h3>
        <p>
          Once you confirm, you can't edit these information. The street address must be close to
          the physical location of the property.
        </p>
      </div>

      <div className="flex flex-col md:flex-row p-6 gap-4">
        <div className="grid gap-5 md:w-2/5">
          <PropertyLabel type="button">
            {leasing === 'FOR RENT' ? (
              <>
                <RentIcon className="text-blue-900" />
                For Rent
              </>
            ) : leasing === 'FOR SALE' ? (
              <>
                <RentIcon className="text-blue-900" />
                For Sale
              </>
            ): (
              <>
                <SaleIcon className="text-blue-900" />
                Short Stays
              </>
            )}
          </PropertyLabel>
          <div>
            <h5 className="font-semibold">Property Name</h5>
            <p>{propertyName}</p>
          </div>
          <div>
            <h5 className="font-semibold">Street address</h5>
            <p>{streetAddress}</p>
          </div>
          <div>
            <h5 className="font-semibold">Unit number</h5>
            <p>{unitNumber || '-'}</p>
          </div>
          <div>
            <h5 className="font-semibold">Property type</h5>
            <p className="capitalize">{`${propertyType?.split('-')[0]}`}</p>
          </div>
        </div>

        <div className="bg-green-50 md:w-3/5 ">
          <Map coordinates={coordinates} />
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 p-6 border border-b-gray-300">
        <Button
          variant={'ghost'}
          onClick={() => openModal('add-property-form')}
          className="text-blue-800">
          Edit Property Information
        </Button>
        <Button onClick={onSubmit}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Confirm
        </Button>
      </div>
    </form>
  );
}

export { ConfirmPropertyForm };
