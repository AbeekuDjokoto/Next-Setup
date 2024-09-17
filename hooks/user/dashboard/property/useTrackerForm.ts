import React from 'react';
import { useCreatePropertyStore } from '@/stores';

export function useTrackerForm(listingType: string) {
  const { defaultAmenitiesData, leaseDetails, listingDetails } = useCreatePropertyStore();
  const [trackerData, setTrackerData] = React.useState([
    {
      id: 1,
      label: 'Property Info',
      isActive: true,
      isCompleted: false,
      features: defaultAmenitiesData,
      type: 'defaultAmenities',
      slug: 'property-information',
    },
    {
      id: 2,
      label: 'Listing Details',
      isActive: false,
      isCompleted: false,
      features: listingDetails,
      type: 'listingDetails',
      slug: 'listing-details',
    },
    {
      id: 3,
      label: 'Rent',
      isActive: false,
      isCompleted: false,
      features: leaseDetails,
      type: 'leaseDetails',
      slug: 'lease-details',
    },
    {
      id: 4,
      label: 'Media',
      isActive: false,
      isCompleted: false,
      features: {},
      slug: 'media',
    },
    {
      id: 5,
      label: 'Amenities',
      isActive: false,
      isCompleted: false,
      features: {},
      slug: 'amenities',
    },
    {
      id: 6,
      label: 'Final Details',
      isActive: false,
      isCompleted: false,
      features: {},
      slug: 'final-details',
    },
    {
      id: 7,
      label: 'Review',
      isActive: false,
      isCompleted: false,
      features: {},
      slug: 'review',
    },
    {
      id: 8,
      label: 'Publish',
      isActive: false,
      isCompleted: false,
      features: {},
      slug: 'publish',
    },
  ]);

  React.useEffect(() => {
    if (listingType === 'FOR_SALE') {
      setTrackerData([
        {
          id: 1,
          label: 'Property Info',
          isActive: true,
          isCompleted: false,
          features: defaultAmenitiesData,
          type: 'defaultAmenities',
          slug: 'property-information',
        },
        {
          id: 2,
          label: 'Listing Details',
          isActive: false,
          isCompleted: false,
          features: listingDetails,
          type: 'listingDetails',
          slug: 'listing-details',
        },
        {
          id: 3,
          label: 'Media',
          isActive: false,
          isCompleted: false,
          features: defaultAmenitiesData,
          slug: 'media',
        },
        {
          id: 4,
          label: 'Amenities',
          isActive: false,
          isCompleted: false,
          features: {},
          slug: 'media',
        },
        {
          id: 5,
          label: 'Final Details',
          isActive: false,
          isCompleted: false,
          features: {},
          slug: 'final-details',
        },
        {
          id: 6,
          label: 'Review',
          isActive: false,
          isCompleted: false,
          features: {},
          slug: 'review',
        },
        {
          id: 7,
          label: 'Publish',
          isActive: false,
          isCompleted: false,
          features: {},
          slug: 'publish',
        },
      ]);
    }
  }, [listingType]);

  function getActive() {
    return trackerData.find((data) => data.isActive);
  }

  function next() {
    const active = trackerData.find((data) => data.isActive === true);
    setTrackerData((prev) => {
      return prev.map((data) => {
        return data.id === active?.id
          ? { ...data, isActive: false, isCompleted: true }
          : { ...data };
      });
    });
    setTrackerData((prev) => {
      return prev.map((data) => {
        return data.id - 1 === active?.id ? { ...data, isActive: true } : { ...data };
      });
    });
  }
  function prev() {
    const active = trackerData.find((data) => data.isActive === true);
    if (active?.id === 1) return;
    if (!active) {
      setTrackerData((prev) => {
        return prev.map((data) => {
          return data.id === 8 ? { ...data, isActive: true, isCompleted: false } : { ...data };
        });
      });

      return;
    }
    setTrackerData((prev) => {
      return prev.map((data) => {
        return data.id === active?.id
          ? { ...data, isActive: false, isCompleted: false }
          : { ...data };
      });
    });
    setTrackerData((prev) => {
      return prev.map((data) => {
        return data.id + 1 === active?.id
          ? { ...data, isActive: true, isCompleted: false }
          : { ...data };
      });
    });
  }

  return {
    next,
    prev,
    getActive,
    trackerData,
  };
}
