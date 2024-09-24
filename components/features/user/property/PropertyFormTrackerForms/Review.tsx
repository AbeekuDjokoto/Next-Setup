'use client';

import React from 'react';
import { Accordion } from '@/components/shared';

import { ReviewPropertyInfo } from '../ReviewAddPropertyForms';
import LocationIcon from '@/public/assets/icons/location-dot-solid.svg';

import { usePropertyReviewData } from '@/hooks/user';
import { ReviewAmenitiesDetails } from '../ReviewAddPropertyForms/ReviewAmenitiesDetails';
import { Modal } from '@/components/shared';
import { EditPropertyDetails } from '../ReviewAddPropertyForms/EditPropertyDetails';
import { PropertyType } from '@/types';
import { BathIcon, BedIcon, ParkingIcon } from '@/public/assets/icons';
import { sortImagesInOrder } from '@/utils';
interface Props {
  isLoading: boolean;
  property?: PropertyType;
  setHideAddress: (...args: any) => void;
  hideAddress: boolean;
  negotiable: boolean;
  setNegotiable: (...args: any) => void;
  control: any;
  showModal: boolean;
  openModal: (...args: any) => void;
  closeModal: () => void;
  contentType: string;
  getAmenitiesProperties: (...args: any) => any[];
  defaultAmenities: any;
  amenities: any;
  availability: boolean;
  setAvailability: (...args: any) => void;
}

export function Review({
  property,
  hideAddress,
  negotiable,
  setNegotiable,
  availability,
  setAvailability,
  setHideAddress,
  control,
  openModal,
  showModal,
  closeModal,
  contentType,
  getAmenitiesProperties,
  defaultAmenities,
  amenities,
  isLoading,
}: Props) {
  const data = usePropertyReviewData(property);

  const [feature, setFeature] = React.useState<{ label: any; value: any; key: any; type: any }>({
    label: null,
    value: null,
    key: null,
    type: null,
  });

  function onHandleEdit(data: any) {
    setFeature(data);
    openModal('open-edit-features');
  }

  console.log('properties', negotiable);

  const propertyImages = sortImagesInOrder(property?.images ?? []);

  return (
    <>
      <div className="grid gap-6">
        <div className="flex gap-6 items-center">
          <div className="h-[150px] w-[150px] bg-blue-200">
            <img
              src={(property && propertyImages && propertyImages[0]) ?? ''}
              alt={property?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid gap-2">
            <div>
              <h3 className="text-2xl font-semibold">{property?.name}</h3>
              <div className="flex gap-2 items-center">
                <LocationIcon className="text-gray-700" />
                <p className="gray-500 text-xs">{property?.streetAddress}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              {getAmenitiesProperties(defaultAmenities, amenities, true).map((item) => (
                <div className="flex w-max items-center gap-2 border border-blue-900 py-2 px-4 rounded-2xl">
                  {item.amenity.name.startsWith('Bed') ? <BedIcon /> : null}
                  {item.amenity.name.startsWith('Bath') ? <BathIcon /> : null}
                  {item.amenity.name.startsWith('Park') ? <ParkingIcon /> : null}
                  <p className="text-xs">
                    {item.data.value} {item.amenity.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {data?.map((item) => {
            return (
              <Accordion key={item.id} id={item.id} title={item.label}>
                {item.label === 'Media' && (
                  <div className="flex flex-wrap gap-2 w-full">
                    {sortImagesInOrder(item?.data[0].value)
                      .filter((img): img is string => !!img)
                      .map((img) => (
                        <div key={img} className="h-[120px] w-[150px] bg-blue-200">
                          <img
                            src={img}
                            alt="property image"
                            className='className="w-full h-full object-cover" '
                          />
                        </div>
                      ))}
                  </div>
                )}
                {item.label === 'Property Info' && (
                  <ReviewAmenitiesDetails
                    onHandleEdit={onHandleEdit}
                    amenities={getAmenitiesProperties(defaultAmenities, amenities, true)}
                  />
                )}
                {item.label === 'Amenities' && (
                  <ReviewAmenitiesDetails
                    onHandleEdit={onHandleEdit}
                    amenities={getAmenitiesProperties(defaultAmenities, amenities, false)}
                    noEdit
                  />
                )}

                {item.label !== 'Amenities' && item.label !== 'Media' && (
                  <ReviewPropertyInfo
                    features={item.data}
                    property={property}
                    onHandleEdit={onHandleEdit}
                  />
                )}
              </Accordion>
            );
          })}
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'open-edit-features' && (
          <EditPropertyDetails
            isLoading={isLoading}
            closeModal={closeModal}
            feature={feature}
            control={control}
            hideAddress={hideAddress}
            negotiable={negotiable}
            setNegotiable={setNegotiable}
            availability={availability}
            setAvailability={setAvailability}
            setHideAddress={setHideAddress}
          />
        )}
      </Modal>
    </>
  );
}
