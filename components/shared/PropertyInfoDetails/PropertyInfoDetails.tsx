'use client';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import LocationIcon from '@/public/assets/icons/location-dot-solid.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import {
  AreaIcon,
  BathIcon,
  BedIcon,
  FacebookIcon,
  LinkedinIcon,
  ParkingIcon,
  ShareIcon,
  TimeIcon,
  WhatsAppIcon,
  XIcon,
} from '@/public/assets/icons';
import { Amenity, PropertyAmenity, PropertyType } from '@/types';
import {
  SAFETY_TIPS,
  formatCurrency,
  formatDate,
  formatDateString,
  getAmenitiesProperties,
  getWishlistId,
  getWishlistSlugs,
  removeDuplicateTags,
  sortImagesInOrder,
} from '@/utils';
import { Check, Copy, Heart, InfoIcon } from 'lucide-react';

import { AuthFormWrapper, OTPVerificationForm, SignInForm } from '@/components/features/user';
import { Accordion, Modal } from '@/components/shared';
import { PropertyLabel } from '@/components/shared/PropertyLabel';
import { useAmenity } from '@/hooks/admin';
import { useCopyToClipBoard, useWishlist } from '@/hooks/shared';
import { useGetPropertyTypeAmenities, useWishlistProperty } from '@/hooks/user';
import { cn } from '@/lib/utils';
import { Tooltip } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Props = Readonly<{
  property?: PropertyType;
  type?: string;
}>;
export function PropertyInfoDetails({ property, type = 'FOR RENT' }: Props) {
  const pathname = usePathname();
  const { defaultAmenities } = useGetPropertyTypeAmenities(property?.type?.slug || '');
  const { data: amenities } = useAmenity(500);

  const propertyDefaultAmenities = getAmenitiesProperties(
    defaultAmenities,
    property?.property_amenities,
    true,
  );

  const otherAmenities = getAmenitiesProperties(
    defaultAmenities,
    property?.property_amenities,
    false,
  );

  const {
    addItemToWishlist,
    removeItemFromWishlist,
    closeModal,
    contentType,
    showModal,
    openModal,
  } = useWishlist();
  const { wishlist } = useWishlistProperty();
  const [showRentTerms, setShowRentTerms] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSafetyTips, setShowSafetyTips] = useState(false);

  return (
    <>
      <div className="grid gap-10 w-full md:w-[91.75%]">
        <div className="grid gap-6">
          <div className="flex flex-row-reverse gap-6 justify-between">
            <div className="flex gap-2 items-center">
              <TimeIcon />{' '}
              {property?.updated_at ? (
                <p className="font-medium text-xs">{formatDateString(property?.updated_at)}</p>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Tooltip content="Wishlist">
                <PropertyLabel
                  onClick={(e) => {
                    e.stopPropagation();
                    if (getWishlistSlugs(wishlist).includes(property?.slug ?? '')) {
                      removeItemFromWishlist(getWishlistId(wishlist, property?.slug ?? ''));
                    } else {
                      addItemToWishlist(property?.slug ?? '');
                    }
                  }}>
                  <Heart
                    className={cn('w-4 h-4', {
                      'fill-pink text-pink': getWishlistSlugs(wishlist).includes(
                        property?.slug ?? '',
                      ),
                    })}
                  />{' '}
                  Save
                </PropertyLabel>
              </Tooltip>

              <Tooltip content="Share">
                <PropertyLabel onClick={() => setShowShare(true)}>
                  <ShareIcon className="w-4 h-4" /> Share
                </PropertyLabel>
              </Tooltip>
            </div>
          </div>

          <div>
            <button
              className="flex gap-2 items-center hover:underline font-semibold"
              onClick={() => setShowSafetyTips(true)}>
              Safety Tips <InfoIcon className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row flex-wrap justify-between ">
            <div className="grid gap-2">
              <h2 className="text-lg uppercase font-bold">{property?.name}</h2>
              <div className="flex items-center gap-2 text-xs">
                {property?.type?.name ? (
                  <div className="border-r border-gray-700 pr-2">{property?.type?.name}</div>
                ) : null}
                <div className="flex items-center gap-2">
                  <LocationIcon className="" />
                  <p className="text-xs">
                    {property?.location?.city} {property?.location?.country}
                  </p>
                </div>
                {property?.availableDate ? (
                  <div className="border-l border-gray-700 pl-2">
                    Available Date: {formatDate(property?.availableDate)}
                  </div>
                ) : null}

                {property?.securityDeposit ? (
                  <div className="border-l border-gray-700 pl-2">
                    Down payment:{' '}
                    {formatCurrency(property?.securityDeposit, 0, property?.currency ?? 'GHC')}
                  </div>
                ) : null}

                {property?.leaseDuration &&
                property?.leasing?.split(' ').join('_') === 'FOR_RENT' ? (
                  <div className="border-l border-gray-700 pl-2">
                    Rent Duration: {property?.leaseDuration} months
                  </div>
                ) : null}
                {property?.negotiable ? (
                  <div className="border-l border-gray-700 pl-2">Negotiable</div>
                ) : null}
                {property?.leaseTermDescription &&
                property?.leasing?.split(' ').join('_') === 'FOR_RENT' ? (
                  <button
                    onClick={() => setShowRentTerms(true)}
                    className="border-l border-gray-700 pl-2 hover:text-pink font-bold">
                    Rent Terms
                  </button>
                ) : null}
              </div>
            </div>
            <div className="font-bold text-lg uppercase">
              <h5>Price {property?.leasing === 'FOR RENT' ? '/month' : null}</h5>
              <p className="text-pink">
                {formatCurrency(property?.price, 0, property?.currency ?? 'GHC')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center flex-wrap">
            {propertyDefaultAmenities.map((item) => (
              <div className="flex w-max items-center gap-2 py-2 px-4 rounded-2xl !text-[#000000]">
                {item.name.startsWith('Land') ? <AreaIcon width="30" height="30" /> : null}
                {item.name.startsWith('Bed') ? <BedIcon width="30" height="30" /> : null}
                {item.name.startsWith('Bath') ? <BathIcon width="30" height="30" /> : null}
                {item.name.startsWith('Park') ? <ParkingIcon width="30" height="30" /> : null}
                <p className="">
                  {item?.data?.value ?? item?.value}
                  {/* {item?.amenity?.name} */}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="grid gap-2">
          <h3 className="text-lg uppercase font-bold">Property Type</h3>
          <p className="text-sm leading-6">{property?.type?.name}</p>
        </div> */}
        <div className="grid gap-2">
          <h3 className="text-lg uppercase font-bold">Description</h3>
          <p className="text-sm leading-6 break-all whitespace-pre-wrap">{property?.desc}</p>
        </div>
        {property?.attributes ? (
          <div className="grid gap-2">
            <h3 className="text-lg uppercase font-bold">Tags</h3>
            <div className="flex flex-wrap gap-4">
              {removeDuplicateTags(property?.attributes)?.map((attribute) => {
                return (
                  <div className="flex w-max items-center gap-2">
                    <p className="text-sm text-[#000000]">{attribute},</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="grid gap-2">
          <h3 className="text-lg uppercase font-bold">What this place offers</h3>

          <div className="grid gap-2">
            {Array.from(groupAmenities(getAmenityWithTypes(amenities, otherAmenities))).map(
              ([category, items]) => (
                <Accordion key={category} id={category} title={category} plus>
                  <div className="flex gap-4 flex-wrap">
                    {items.map((item: any) => (
                      <div className="flex w-max gap-2 text-xs items-center">
                        {/* <item.amenity.icon className="w-5 h-5 text-black" /> */}

                        <p className="self-end !text-[#000000]">
                          {item?.data?.value ? item.data.value : null} {item?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </Accordion>
              ),
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'sign-in' && (
          <div className="bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <SignInForm type="client" to={pathname} openModal={() => openModal('verify-code')} />
            </AuthFormWrapper>
          </div>
        )}
        {contentType === 'verify-code' && (
          <div className="bg-white py-6 rounded-lg mx-6">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <OTPVerificationForm type="client" closeModal={closeModal} to={pathname} />
            </AuthFormWrapper>
          </div>
        )}
      </Modal>

      <Modal show={showRentTerms} hideModal={() => setShowRentTerms(false)}>
        <div className="bg-white w-full min-w-[390px] max-w-2xl h-96 p-6 rounded-lg flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Rent Terms</h3>
          <div className="overflow-y-auto noscroll-indicator">
            <p className="leading-7">{property?.leaseTermDescription}</p>
          </div>
        </div>
      </Modal>
      <Modal show={showShare} hideModal={() => setShowShare(false)}>
        <ShareOnSocial
          closeModal={() => setShowShare(false)}
          propertyName={property?.name!}
          img={(property && property.images && sortImagesInOrder(property?.images)[0]) || ''}
        />
      </Modal>
      <Modal show={showSafetyTips} hideModal={() => setShowSafetyTips(false)} className="m-5">
        <div className="bg-white p-5 max-w-[600px] max-h-[400px] md:max-h-max overflow-y-scroll">
          <h3 className="text-lg font-bold">Safety Tips</h3>

          <ul className="ml-4 flex flex-col gap-2">
            {SAFETY_TIPS.map((tip, index) => {
              return (
                <li className="list-disc" key={index}>
                  <p className="font-semibold">{tip.point}</p>
                  <p>{tip.sub_point}</p>
                </li>
              );
            })}
          </ul>

          <h3 className="text-lg font-bold mt-4">Disclaimer</h3>
          <p>
            Ownkey prioritizes the safety and security of our users. While we strive to ensure all
            listings are credible, we encourage users to exercise caution and due diligence during
            their property search.
          </p>
        </div>
      </Modal>
    </>
  );
}

function getAmenityWithTypes(amenities?: any, propertyAmenities?: PropertyAmenity[]) {
  if (!propertyAmenities || !amenities) return [];

  function getAmType(data: Amenity[]) {
    let obj: { [key: string]: any } = {};
    for (let item of data) {
      const key = item.slug;
      obj[key] = item.type;
    }

    return obj;
  }
  let allAmenities = getAmType(amenities);
  let arr = [];

  for (let item of propertyAmenities) {
    let key = item.slug;
    let out = { ...item, type: allAmenities[key] };

    arr.push(out);
  }

  return arr;
}

function groupAmenities(amenities: any) {
  const obj = new Map();

  for (let item of amenities) {
    if (item.value) {
      if (obj.has(item?.type?.desc)) {
        obj.set(item?.type?.desc, [...obj.get(item?.type?.desc), item]);
      } else {
        obj.set(item?.type?.desc, [item]);
      }
    }
  }

  console.log('obj', obj);

  return obj;
}

function ShareOnSocial({
  closeModal,
  img,
  propertyName,
}: {
  closeModal: () => void;
  img: string;
  propertyName: string;
}) {
  const { handleCopyClick, isCopying } = useCopyToClipBoard();
  const pathname = usePathname();
  const initialMessage = 'Check out this property on Ownkey!';

  const propertyUrl = `https://ownkey.com${pathname}`;

  return (
    <div className="bg-white w-[90%] m-auto md:w-[500px] p-6 rounded-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Share this property</h3>
        <button onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-[125px] h-[125px]">
          <img src={img} alt={propertyName} className="rounded-lg w-full h-full object-cover" />
        </div>
        <p>{propertyName}</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-300 rounded-lg">
            <FacebookShareButton
              title={initialMessage}
              url={propertyUrl}
              hashtag="#ownkey"
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <FacebookIcon className="w-5 h-5" /> Facebook
            </FacebookShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <LinkedinShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <LinkedinIcon className="w-5 h-5" /> LinkedIn
            </LinkedinShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <TwitterShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <XIcon className="w-5 h-5" /> Twitter(X)
            </TwitterShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <WhatsappShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </WhatsappShareButton>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full">
          <input type="text" value={propertyUrl} className="grow rounded" />
          <div>
            {isCopying ? (
              <div className="flex gap-1 items-center justify-center text-sm text-gray-300">
                <Check className="w-4" /> <p className="text-[8px]">copied!</p>
              </div>
            ) : (
              <>
                <CopyToClipboard text={propertyUrl} onCopy={() => handleCopyClick(propertyUrl)}>
                  <button className="grid place-items-center">
                    <Copy
                      {...({
                        className: 'w-5 h-5',
                      } as React.SVGProps<SVGSVGElement>)}
                    />
                  </button>
                </CopyToClipboard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
