import React from 'react';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { Button } from '@/components/shared';
import { getAddressComponentValue, MAP_DETAILS } from '@/utils';
import { useCreatePropertyStore } from '@/stores';

export function PlacesAutoComplete({
  setSelected,
  openModal,
  reOpenModal,
}: {
  setSelected: (...args: any) => void;
  openModal: (...args: any) => void;
  reOpenModal: (...args: any) => void;
}) {
  const { onAddLocation } = useCreatePropertyStore();
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
    setSelected({ lat, lng });

    let locationObj = {
      longitude: lng,
      latitude: lat,
      country: getAddressComponentValue(results, MAP_DETAILS.COUNTRY),
      city: getAddressComponentValue(results, MAP_DETAILS.CITY),
      street: results[0]?.formatted_address,
    };
    onAddLocation(locationObj);
  }

  return (
    <div className="flex gap-2 items-center my-6">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="search street name"
          className="flex h-11 w-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <ComboboxPopover className="my-4 border p-4 rounded bg-white max-h-[200px] overflow-y-auto z-50 noscroll-indicator">
          <ComboboxList className="">
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <>
                  <ComboboxOption
                    key={place_id}
                    value={description}
                    className="cursor-pointer hover:text-blue-600 hover:bg-blue-50 p-2 rounded"
                  />
                </>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      <Button onClick={openModal} className="!h-11">
        Submit
      </Button>
    </div>
  );
}
