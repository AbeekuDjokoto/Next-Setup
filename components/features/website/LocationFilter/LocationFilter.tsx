import { getAddressComponentValue, MAP_DETAILS } from '@/utils';

import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { cn } from '@/lib/utils';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';

export function LocationFilter({
  setFilter,
  inputClassName,
  comboboxClassName,
  placeholder = 'Search Location, Street',
}: {
  setFilter: (...args: any) => void;
  inputClassName?: string;
  comboboxClassName?: string;
  placeholder?: string;
}) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      componentRestrictions: { country: 'GH' },
    },
  });

  async function handleSelect(address: string) {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    let locationObj = {
      longitude: lng,
      latitude: lat,
      country: getAddressComponentValue(results, MAP_DETAILS.COUNTRY),
      city: getAddressComponentValue(results, MAP_DETAILS.CITY),
      street: results[0]?.formatted_address,
    };

    setFilter((filter: any) => {
      return {
        ...filter,
        street_address: locationObj.street,
      };
    });
  }
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder={placeholder}
        id="location"
        className={cn(
          'bg-inherit border:none focus:outline-none focus:border-none placeholder:text-sm placeholder:text-gray-500',
          inputClassName,
        )}
      />
      <ComboboxPopover
        className={cn(
          'my-10 border p-4 rounded-lg bg-white min-w-[300px] h-[300px] overflow-y-auto noscroll-indicator z-50',
          comboboxClassName,
        )}>
        <ComboboxList className="">
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="cursor-pointer hover:text-blue-600 hover:bg-blue-50 p-2 rounded"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
