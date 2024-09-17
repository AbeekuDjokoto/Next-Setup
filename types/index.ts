export * from './auth';
export * from './property';
export * from './payment';

export type Amenity = {
  slug: string;
  name: string;
  meta: string;
  type: { slug: string; name: string; desc: string };
};

export type PropertyAmenity = {
  // id: number;
  // created_at: string;
  // amenity: {
  //   slug: string;
  //   name: string;
  //   meta: string;
  //   type?: {
  //     slug: string;
  //     name: string;
  //     desc: string;
  //   };
  // };
  // data: {
  //   value: any;
  // };
  id: number;
  created_at: string;
  amenity: {
    id: number;
    created_at: string;
    updated_at: string;
    slug: string;
    name: string;
  };
  meta: string;
  name: string;
  value: any;
  slug: string;
};

export type PropertyAmenityWithType = {
  id: number;
  created_at: string;
  amenity: {
    id: number;
    created_at: string;
    updated_at: string;
    slug: string;
    name: string;
  };
};

export type INotification = {
  id: number;
  created_at: string;
  title: string;
  body: string;
  read: boolean;
};
