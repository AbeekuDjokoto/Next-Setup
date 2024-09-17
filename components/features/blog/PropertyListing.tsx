import { Property } from '@/types/blog';

import Image from 'next/image';

export const PropertyListing = ({
  name,
  location,
  images,
  slug,
  price,
  currency,
  property_amenities,
  leasing,
}: Property) => {
  return (
    <div className="border rounded-3xl p-3 mb-5">
      <a
        className="block md:grid grid-cols-3 gap-3"
        href={`https://ownkey.com/property/${slug}`}
        target="_blank">
        <div className="block md:hidden">
          <Image
            src={images[0]}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
            className="rounded-3xl"
          />
        </div>
        <div className="col-span-1 hidden md:block">
          <Image
            src={images[0]}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '12rem', height: '9rem', objectFit: 'cover' }}
            className="rounded-3xl"
          />
        </div>

        <div className="col-span-2">
          <div className="border-b pb-3 mt-7">
            <div className="flex justify-between gap-5 w-full">
              <h3 className="font-semibold text-[14px] text-[#1B1B1B] w-[70%]">{name}</h3>
              <p className="text-[0.8rem] w-[30%] text-[#D62151]">{leasing}</p>
            </div>
            <p className="text-[12px] text-[#52525B]">
              {location.city}, {location.country}
            </p>
            <div className="text-sm mt-3 flex gap-2">
              {property_amenities.length > 0 &&
                property_amenities.slice(0, 2).map((a, idx) => (
                  <div key={idx} className="flex gap-1 items-center w-full">
                    {a.icon && <Image src={a.icon} alt="Logo" width={20} height={20} />}
                    <span>{a.value}</span>
                    <span>{a.name}</span>
                  </div>
                ))}
            </div>
          </div>

          <p className="text-end font-bold text-xl mt-5">
            {currency}
            {currency === 'USD' ? '$' : '₵'} {price}
          </p>
        </div>
      </a>
    </div>
  );
};
