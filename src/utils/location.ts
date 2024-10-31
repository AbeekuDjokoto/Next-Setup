export const MAP_DETAILS = {
  COUNTRY: 'country',
  CITY: 'locality',
  STATE: 'administrative_area_level_1',
  STREET: 'administrative_area_level_2',
};

export function getAddressComponentValue(
  address: Address[],
  component: string,
): string | undefined {
  const result = address
    .flatMap((item) => item.address_components)
    .find((componentItem) => componentItem.types.includes(component));

  return result ? result.long_name : undefined;
}

interface Address {
  address_components: AddressComponent[];
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
