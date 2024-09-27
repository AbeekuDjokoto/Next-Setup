import {Amenity} from '.'

export interface Agent {
  user: {
    firstname: string;
    lastname: string;
    phone: string;
    profileImage: string;
  };
  total_rating: number;
  type: {
    name: string;
  };
}

export interface BlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  category: string;
  date: string;
  author: {
    name: string;
    slug: string;
  };
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: any;
  titleImage: any;
}

export interface Property {
  name: string;
  location: {
    city: string;
    country: string;
  };
  images: string[];
  slug: string;
  price: string;
  currency: string;
  leasing: string;
  property_amenities: Amenity[]
}

export interface BlogCategories {
  title: string;
  subTitle: string;
}
