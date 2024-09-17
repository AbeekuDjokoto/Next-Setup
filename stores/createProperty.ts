import { PropertyType } from '@/types';
import { bool } from 'yup';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  propertyName: string;
  listing: string;
  leasing: string;
  streetAddress: string;
  propertyType: string;
  unitNumber: string;
  hidePropertyAddress: boolean;
  defaultAmenities: [];
  defaultAmenitiesData: {};
  listingDetails: {};
  leaseDetails: {};
  media: [];
  location: {
    longitude?: number;
    latitude?: number;
    country?: string;
    city?: string;
    street?: string;
  };
}

interface Store extends State {
  reset: () => void;
  // eslint-disable-next-line no-unused-vars
  onAddProperty: (...args: any) => void;
  onAddDefaultAmenities: (...args: any) => void;
  onAddDefaultAmenitiesData: (...args: any) => void;
  onAddListingDetailsData: (...args: any) => void;
  onAddLeaseDetailsData: (...args: any) => void;
  onAddMediaData: (...args: any) => void;
  onHidePropertyAddress: (...args: any) => void;
  onAddLocation: (...args: any) => void;
}

const initialState: State = {
  propertyName: '',
  listing: '',
  leasing: '',
  streetAddress: '',
  propertyType: '',
  unitNumber: '',
  hidePropertyAddress: false,
  defaultAmenities: [],
  defaultAmenitiesData: {},
  listingDetails: {},
  leaseDetails: {},
  media: [],
  location: {
    longitude: -1.023194,
    latitude: 7.946527,
    country: 'Ghana',
    street: '',
  },
};

const createPropertyStore: StateCreator<Store> = (set) => ({
  ...initialState,
  reset: () => set(initialState),
  onAddProperty: ({ leasing, listing, streetAddress, propertyType, unitNumber, propertyName }) => {
    set({
      propertyName,
      leasing,
      listing,
      streetAddress,
      propertyType,
      unitNumber,
    });
  },
  onAddDefaultAmenities: (data: any) => {
    set({
      defaultAmenities: data,
    });
  },
  onAddDefaultAmenitiesData: (data: any) => {
    set({
      defaultAmenitiesData: data,
    });
  },
  onAddListingDetailsData: (data: any) => {
    set({
      listingDetails: data,
    });
  },
  onAddLeaseDetailsData: (data: any) => {
    set({
      leaseDetails: data,
    });
  },
  onAddMediaData: (data: any) => {
    set({
      media: data,
    });
  },
  onHidePropertyAddress: (data: any) => {
    set({
      hidePropertyAddress: data,
    });
  },
  onAddLocation: (data: any) => {
    set({
      location: data,
    });
  },
});

export const useCreatePropertyStore = create(
  persist(createPropertyStore, { name: 'ownkey-web-create-property' }),
);

class Property {
  private _property: PropertyType;

  constructor(property: PropertyType) {
    this._property = property;
  }

  // Getting PropertyInfo
  get propertyInfo(): any {
    return {
      desc: this._property.desc,
    };
  }

  // Getting listingInfo
  get listingInfo(): any {
    return {
      desc: this._property.desc,
    };
  }
  // Getting PropertyInfo
  get leaseInfo(): any {
    return {
      desc: this._property.desc,
    };
  }
}
