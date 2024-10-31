'use client';
import { Check } from 'lucide-react';

import { useListingTypesList, usePropertyTypes } from '@/hooks';
import { cn } from '@/libs';
import { FilterType } from '@/types';

import { Icon } from '../Icon';

type Props = {
  type: string;
  filter: FilterType;
  setFilter: (...arg: any) => void;
};

export function CustomDropdown({ filter, setFilter, type }: Props) {
  const { propertyTypes, isLoadingPropertyTypes } = usePropertyTypes(20);
  const { data: listingTypes } = useListingTypesList();
  // const listingTypes = [
  //   // { id: '', name: 'All' },
  //   { id: 'FOR_SALE', name: 'For Sale' },
  //   { id: 'FOR_RENT', name: 'For Rent' },
  //   // { id: 'FOR_RENT', name: 'For Short-stays' },
  // ];

  /*
   * TODO: on this dropdown, we need two additional things.
   * 1) a check box below the last item e.g. [ ] Number of beds and above, if this checked, the bedroom search will be the number and above.
   * 2) We have to extend this dropdown sheet to add a few popular amenities each preceded by [ ] checkbox. e.g. [ ] Must have A/c, [ ] Must have Pool, [ ] Gated community,
   */

  return (
    <div>
      {isLoadingPropertyTypes ? (
        <div className="w-full h-full grid place-items-center">
          <Icon name="Spinner" className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          {type === 'listing' && (
            <>
              {listingTypes?.map((item) => {
                return (
                  <div
                    onClick={() =>
                      setFilter((prev: any) => {
                        return { ...prev, listing: item.id };
                      })
                    }
                    key={item.id}
                    className="p-3 rounded-md hover:text-blue-600 hover:bg-blue-50 flex items-center justify-between">
                    <p>{item.name}</p>

                    <Check
                      className={cn('hidden text-blue-600', {
                        block: filter.listing === item.id,
                      })}
                    />
                  </div>
                );
              })}
            </>
          )}

          {type === 'type' && (
            <>
              {propertyTypes.map((item) => {
                return (
                  <div
                    onClick={() =>
                      setFilter((prev: any) => {
                        return { ...prev, property_type: item.slug };
                      })
                    }
                    key={item.slug}
                    className="p-3 rounded-md hover:text-blue-600 hover:bg-blue-50 flex items-center justify-between">
                    <p>{item.name}</p>

                    <Check
                      className={cn('hidden text-blue-600', {
                        block: filter.property_type === item.slug,
                      })}
                    />
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}
