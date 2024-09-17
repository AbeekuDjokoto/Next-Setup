var trackerData = [
  {
    id: 1,
    label: 'Property Info',
    features: [{ key: 'desc', label: 'Property Description', type: 'textarea' }],
  },
  {
    id: 2,
    label: 'Listing Details',
    features: [
      { key: 'price', label: 'Monthly Rent', type: 'number' },
      { key: 'securityDeposit', label: 'Down Payment', type: 'number' },
      { key: 'availableDate', label: 'Available Date', type: 'date' },
    ],
  },
  {
    id: 3,
    label: 'Rent',
    features: [
      { key: 'leaseDuration', label: 'Rent Duration', type: 'number' },
      { key: 'leaseTermDescription', label: 'Rent Terms', type: 'textarea' },
    ],
  },
  {
    id: 4,
    label: 'Media',
    features: [{ key: 'images', label: 'Images', type: 'images' }],
  },
  {
    id: 5,
    label: 'Amenities',
    features: [{ key: 'amenities', label: 'Amenities', type: 'text' }],
  },
  {
    id: 6,
    label: 'Final Details',
    features: [
      { key: 'hideAddress', label: 'Hide Address', type: 'switch' },
      { key: 'availability', label: 'Property Availability', type: 'switch' },
      { key: 'negotiable', label: 'Negotiable', type: 'switch' },
    ],
  },
];

export function usePropertyReviewData(property: any) {
  if (!property) return [];

  const data = trackerData
    .map((item) => ({ ...item, data: getPropertyKey(...item.features) }))
    .filter((item) =>
      property?.leasing.split(' ').join('_') === 'FOR_SALE' ? item.id !== 3 : item,
    );

  return data;

  function getPropertyKey(...rest: { key: string; label: string; type: string }[]) {
    let arr: { key?: string; label?: string; value?: any }[] = [];
    for (let item of rest) {
      let obj = {
        key: item.key,
        label: item.label,
        type: item.type,
        value: property[item.key],
      };

      arr.push(obj);
    }
    return arr;
  }
}
