import { httpClient } from '@/config';
import { Amenity } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useGetPropertyTypeAmenities(type: string) {
  const { data: defaultAmenities, isPending: isLoadingDefaultAmenities } = useQuery<
    Amenity[],
    Error,
    Amenity[]
  >({
    queryKey: ['defaultAmenities', type],
    queryFn: () => httpClient.get(`/property/${type}/amenities`),
    enabled: !!type,
  });

  function getAmenities(defaultAmenities: Amenity[]) {
    let arr = [];
    for (let item of defaultAmenities) {
      if (item) {
        arr.push(item);
      }
    }
    return arr;
  }

  return {
    defaultAmenities: getAmenities(defaultAmenities ?? []),
    isLoadingDefaultAmenities,
  };
}
