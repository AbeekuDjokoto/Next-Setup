'use client';
import React from 'react';

import {
  Amenities,
  FinalDetails,
  FormTracker,
  Lease,
  ListingDetails,
  Media,
  PropertyInfo,
  Review,
} from '@/components/features/user';
import {
  useTrackerForm,
  useUpdateProperty,
  useGetSingleHostProperty,
  useGetPropertyTypeAmenities,
} from '@/hooks/user';

import { useForm } from 'react-hook-form';
import { useAmenity } from '@/hooks/admin';
import { useParams, useRouter } from 'next/navigation';
import { Icons, Button, ImageSlider, PropertyInfoDetails } from '@/components/shared';
import { ROUTES, sortImagesInOrder } from '@/utils';

type PropertyAmenity = {
  // id: number;
  // created_at: string;
  // amenity: {
  //   slug: string;
  //   name: string;
  //   meta: string;
  // };
  // data: {
  //   value: any;
  // };
  meta: string;
  name: string;
  value: any;
  slug: string;
};

function AddProductDetails() {
  const router = useRouter();
  const [attributes, setAttributes] = React.useState<{ label: string; value: string }[]>([]);
  const [skipNext, setSkipNext] = React.useState(false);
  const { property_id } = useParams();
  const { property, refetchProperty } = useGetSingleHostProperty(property_id);
  const [hideAddress, setHideAddress] = React.useState(!!property?.hideAddress);
  const [availability, setAvailability] = React.useState(property?.availability ?? true);
  const [negotiable, setNegotiable] = React.useState(!!property?.negotiable);
  const { defaultAmenities, isLoadingDefaultAmenities } = useGetPropertyTypeAmenities(
    property?.type?.slug || '',
  );

  const { trackerData, next, prev, getActive } = useTrackerForm(
    property?.leasing.split(' ').join('_') ?? 'FOR_RENT',
  );
  const {
    onUpdateProperty,
    isLoading,
    mediaFiles,
    setFiles: setMediaFiles,
    handlePropertyImageUpload,
    isLoadingUploadImage,
    showModal,
    openModal,
    contentType,
    closeModal,
    onAsyncUpdateProperty,
  } = useUpdateProperty(
    property_id,
    next,
    refetchProperty,
    getActive()?.label || '',
    property?.images ?? [],
  );

  const { data: amenities } = useAmenity(200);
  const propertyImages = sortImagesInOrder(property?.images ?? []);

  React.useEffect(() => {
    setHideAddress(!!property?.hideAddress);
  }, [property?.hideAddress]);

  const { register, handleSubmit, control, formState, watch } = useForm({
    defaultValues: {
      attributes: [],
    },
  });

  async function onSubmit(data: any) {
    if (getActive()?.label === 'Rent') {
      let obj = {
        leaseDuration: Number(data?.leaseDuration),
        leaseTermDescription: data?.leaseTermDescription,
      };
      onUpdateProperty(obj);
      return;
    }
    if (getActive()?.label === 'Media') {
      await onAsyncUpdateProperty({ video_url: data?.video_url || '' });
      handlePropertyImageUpload();
      return;
    }

    if (getActive()?.label === 'Publish') {
      onUpdateProperty({ status: 'PENDING', published: true });
      router.push(ROUTES.USER.HOST.DASHBOARD.PROPERTIES);
    }

    let obj = { ...removeAllAmenities(data, '~') };
    obj.amenities = getAmenities(data, '~').filter((item) => item.value === true);

    if (obj?.leaseDuration) {
      obj.leaseDuration = Number(obj.leaseDuration);
    }
    if (obj?.price) {
      obj.price = Number(obj.price);
    }
    if (obj?.securityDeposit) {
      obj.securityDeposit = Number(data.securityDeposit);
    }
    if (obj?.availableDate) {
      const event = new Date(data.availableDate);
      obj.availableDate = event.toISOString();
    }

    let propertyAttributes = [];
    for (let item of attributes) {
      propertyAttributes.push(item.value);
    }

    obj.hideAddress = hideAddress;
    obj.availability = availability;
    obj.attributes = propertyAttributes;

    if (getActive()?.label === 'Review' && skipNext) {
      next();
      setSkipNext(false);
      return;
    }

    if (getActive()?.label === 'Review') {
      console.log('reviewing');
      onUpdateProperty(obj);
      return;
    }

    onUpdateProperty(obj);
  }

  React.useEffect(() => {
    if (property && property.attributes) {
      const newAttributes = (property.attributes as { slug: string; name: string }[]).map(
        (item) => ({
          label: item.name,
          value: item.slug,
        }),
      );
      setAttributes(newAttributes);
    }
  }, [property]);

  return (
    <>
      <div className="grid gap-6">
        <>
          <div className="flex justify-between items-center border-b-[1px] border-grey-300 py-4">
            <h1 className="text-lg font-semibold uppercase">{property?.name}</h1>
            <div className="text-base">{getActive()?.label}</div>
          </div>
          <div className="overflow-x-auto max-sm:py-6 noscroll-indicator">
            <FormTracker trackerData={trackerData} />
          </div>
        </>

        <form onSubmit={handleSubmit(onSubmit)} id="update-property">
          <div className="min-h-[60vh] max-h-[60vh] md:max-h-[58vh] md:min-h-[57.5vh] overflow-y-auto md:p-8">
            {getActive()?.label === 'Property Info' && (
              <PropertyInfo
                control={control}
                desc={property?.desc || ''}
                register={register}
                defaultAmenityValues={getAmenitiesValues(
                  getAmenitiesProperties(defaultAmenities, property?.property_amenities, true),
                )}
                defaultAmenities={defaultAmenities}
                isLoading={isLoadingDefaultAmenities}
              />
            )}
            {getActive()?.label === 'Listing Details' && (
              <ListingDetails
                attributes={attributes}
                setAttributes={setAttributes}
                register={register}
                leasing={property?.leasing || 'FOR_RENT'}
                property={property}
                control={control}
              />
            )}
            {getActive()?.label === 'Rent' && <Lease control={control} property={property} />}
            {getActive()?.label === 'Media' && (
              <Media
                setMediaFiles={setMediaFiles}
                mediaFiles={mediaFiles}
                propertyImages={(propertyImages as string[]) ?? []}
                control={control}
                video_url={property?.video_url || ''}
              />
            )}
            {getActive()?.label === 'Amenities' && (
              <Amenities
                propertyAmenities={getAmenitiesProperties(
                  defaultAmenities,
                  property?.property_amenities,
                  false,
                )}
                defaultAmenities={defaultAmenities}
                allAmenities={amenities}
                register={register}
                control={control}
              />
            )}
            {getActive()?.label === 'Final Details' && (
              <FinalDetails
                negotiable={negotiable}
                hideAddress={hideAddress}
                availability={availability}
                setHideAddress={setHideAddress}
                setAvailability={setAvailability}
                setNegotiable={setNegotiable}
              />
            )}
            {getActive()?.label === 'Review' && (
              <Review
                negotiable={negotiable}
                setNegotiable={setNegotiable}
                closeModal={closeModal}
                showModal={showModal}
                openModal={openModal}
                contentType={contentType}
                property={property}
                control={control}
                hideAddress={hideAddress}
                isLoading={isLoading}
                setHideAddress={setHideAddress}
                defaultAmenities={defaultAmenities}
                amenities={property?.property_amenities}
                availability={availability}
                setAvailability={setAvailability}
                getAmenitiesProperties={getAmenitiesProperties}
              />
            )}
            {getActive()?.label === 'Publish' && (
              <div className="flex flex-col gap-10">
                <ImageSlider images={property?.images || []} />
                <PropertyInfoDetails type={property?.leasing} property={property} />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center md:px-8 mt-3">
            <Button type="button" onClick={prev} className="px-6" variant={'outline'}>
              Back
            </Button>
            <Button
              type="submit"
              onClick={getActive()?.label === 'Review' ? () => setSkipNext(true) : () => null}>
              {(isLoading || isLoadingUploadImage) && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {getActive()?.label === 'Publish' ? 'Publish' : 'Next'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function removeAllAmenities(data: object, symbol: string) {
  let mainObj: { [key: string]: any } = {};
  Object.entries(data).forEach(([key, value]) => {
    if (!Array.prototype.includes.call(key, symbol)) {
      let obj: { [key: string]: string } = {};
      obj[key] = value;
      mainObj = Object.assign(mainObj, obj);
    }
  });

  return mainObj;
}

function getAmenities(data: object, symbol: string) {
  let arr: { id: string; value: any }[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (Array.prototype.includes.call(key, symbol)) {
      let obj = { id: key.split(symbol)[0], value };
      arr.push(obj);
    }
  });

  return arr;
}

function getAmenitiesValues(data: PropertyAmenity[] | undefined) {
  let amenities: { [key: string]: string } = {};
  if (!data) return amenities;
  for (let item of data) {
    const key: string = `${item.slug}~amenity`;

    // TODO change value string to [value]
    amenities[key] = item.value;
  }
  return amenities;
}

function getAmenitiesProperties(
  defaultAmenities: { slug: string; name: string }[],
  amenities: PropertyAmenity[] = [],
  includeDefault: boolean,
) {
  let defaultAmenitySlugs: string[] = [];
  let otherAmenities: any[] = [];
  if (!defaultAmenities || !amenities) return otherAmenities;

  for (let item of defaultAmenities) {
    defaultAmenitySlugs.push(item?.slug);
  }

  if (includeDefault) {
    otherAmenities = amenities.filter((item) => defaultAmenitySlugs.includes(item.slug));
  } else {
    otherAmenities = amenities.filter((item) => !defaultAmenitySlugs.includes(item.slug));
  }
  return otherAmenities;
}

export default AddProductDetails;
