import { string } from 'zod';
import { PropertyAmenity } from '.';

export interface PropertyType {
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  price: number;
  type: {
    slug: string;
    name: string;
  };
  description: string;
  id: number;
  listing: string;
  discount: number;
  attributes: { slug: string; name: string }[] | string[];
  currency: 'USD' | 'GHC';
  leasing: string;
  size: number;
  unitNumber: number;
  securityDeposit: number;
  verified: boolean;
  desc: string;
  published: boolean;
  availability: boolean;
  negotiable: boolean;
  availableDate: string;
  streetAddress: string;
  hideAddress: boolean;
  leaseDuration: number;
  rejectReason?: string;
  leaseTermDescription: string;
  active: boolean;
  disabled: boolean;
  status: string;
  property_amenities: PropertyAmenity[];
  amenities?: { name: string; slug: string; meta: string; value: string }[];
  host: any;
  location: {
    id: number;
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    state: string;
  };
  images: null;
  video_url?: string;
}

export type FilterType = {
  listing: any;
  property_type: any;
  min_price: any;
  max_price: any;
  host_id: any;
  street_address: string;
  q: string;
  currency: string;
  amenity?: any;
  page?: any;
};

export interface IAmenity {
  id: number;
  created_at: string;
  amenity: {
    slug: string;
    name: string;
    meta: string;
    icon: any;
    type: {
      slug: string;
      name: string;
      desc: string;
    };
  };
  data: {
    value: any;
  };
}

export type ListingTypes = {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
};
