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

export type ListingTypes = {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
};
