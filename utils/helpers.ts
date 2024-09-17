import { format, formatDistance, parseISO, subDays } from 'date-fns';
import { redirect as redirectFn } from 'next/navigation';

import React from 'react';
import { ROUTES, getItem } from '.';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores';
import { IAmenity, PropertyAmenity } from '@/types';

export function conditional(condition: boolean, node: React.ReactNode): React.ReactNode | null {
  return condition ? node : null;
}

export function getInitials(firstname: string, lastname: string) {
  if (!!firstname && !!lastname) {
    return `${firstname[0]}${lastname[0]}`;
  }
  return '-';
}

export const logout = (type: string) => {
  let path = ROUTES.USER.CLIENT.AUTH.LOGIN;
  if (type === 'ADMIN') {
    path = ROUTES.ADMIN.AUTH.LOGIN;
  } else if (type === 'HOST') {
    path = ROUTES.USER.HOST.AUTH.LOGIN;
  }
  localStorage.removeItem('ownkey-web-auth-store');
  return window.location.replace(path);
};

export function formatCurrency(
  amount: number | undefined,
  fractionalDigit: number = 0,
  currency: 'GHC' | 'USD',
): string {
  let currencySymbol: 'GHS' | 'USD' = 'GHS';
  let currencyFormat: 'en-GH' | 'en-US' = 'en-GH';

  if (currency === 'GHC') {
    currencySymbol = 'GHS';
    currencyFormat = 'en-GH';
  } else if (currency === 'USD') {
    currencySymbol = 'USD';
    currencyFormat = 'en-US';
  }

  let formatting_options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencySymbol,
    minimumFractionDigits: fractionalDigit,
  };
  let dollarString = new Intl.NumberFormat(currencyFormat, formatting_options);
  if (!amount) {
    return dollarString.format(0);
  }

  if (currency === 'USD') {
    return `US${dollarString.format(amount)}`;
  }

  return dollarString.format(amount);
}

interface Item {
  label: string;
  value: string;
  desc: string;
}

export function getLabelValue(arr: any) {
  let arrData: Item[] = [];
  if (!arr) return arrData;
  for (let item of arr) {
    arrData.push({ label: item.name, value: item.slug, desc: item.description });
  }

  return arrData;
}

export function getPayloadValues(arr: any) {
  let arrData: string[] = [];
  if (!arr) return arrData;
  for (let item of arr) {
    arrData.push(item.slug);
  }

  return arrData;
}

export function getGreeting() {
  let greeting;
  const date = new Date().getHours();
  if (date >= 0 && date <= 11) {
    greeting = 'Good Morning';
  } else if (date >= 12 && date <= 17) {
    greeting = 'Good Afternoon';
  } else if (date >= 18 && date <= 23) {
    greeting = 'Good Evening';
  }
  return greeting;
}

type Variant = 'default' | 'success' | 'progress' | 'destructive' | 'default';

export function getStatusVariant(status: string | undefined): Variant {
  let label: Variant = 'default';

  switch (status?.toLowerCase()) {
    case 'active':
      label = 'success';
      break;
    case 'accepted':
      label = 'success';
      break;
    case 'progress':
      label = 'progress';
      break;
    case 'rejected':
      label = 'destructive';
      break;
    case 'deactive':
      label = 'destructive';
      break;
    case 'sold':
      label = 'success';
      break;
    case 'taken':
      label = 'success';
      break;
    default:
      label = 'default';
  }

  return label;
}

export function setImage(firstName?: string, lastName?: string, image?: string) {
  let imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`;
  if (image) {
    imageUrl = image;
  }
  return imageUrl;
}

export function redirect(type: string) {
  let path = ROUTES.USER.HOST.AUTH.LOGIN;
  if (type === 'ADMIN') {
    path = ROUTES.ADMIN.AUTH.LOGIN;
  } else if (type === 'USER') {
    path = ROUTES.USER.CLIENT.AUTH.LOGIN;
  }
  const accessToken = useAuthStore.getState()?.accessToken;
  if (!accessToken) {
    return redirectFn(path);
  }

  const decoded: Partial<{ type: string; exp: number }> = jwtDecode(accessToken);
  if (decoded.type === 'USER') return redirectFn(ROUTES.USER.CLIENT.DASHBOARD.PROFILE);
  if (decoded.type !== type) return redirectFn(path);

  const now = Date.now();

  if (decoded.exp) {
    if (decoded.exp > now) {
      return redirectFn(path);
    }
  }
}

export const formatDate = (value: string) => {
  if (value) {
    return format(parseISO(value), 'MMMM dd, yyyy');
  }
  return value;
};

export function getPropertyCardSize(size: string) {
  let width;
  switch (size) {
    case 'small':
      width = 220;
      break;
    case 'large':
      width = 270;
      break;
    case 'medium':
      width = 240;
      break;
    default:
      width = 240;
      break;
  }
  return width;
}

export function getAmenitiesProperties(
  defaultAmenities: { slug: string; name: string }[],
  amenities: any[] = [],
  includeDefault: boolean,
) {
  let defaultAmenitySlugs: string[] = [];
  let otherAmenities: any[] = [];
  if (!defaultAmenities || !amenities) return otherAmenities;

  for (let item of defaultAmenities) {
    defaultAmenitySlugs.push(item?.slug);
  }

  if (includeDefault) {
    otherAmenities = amenities.filter((item) => defaultAmenitySlugs.includes(item.slug));
  } else {
    otherAmenities = amenities.filter((item) => !defaultAmenitySlugs.includes(item.slug));
  }
  return otherAmenities;
}

export function getWishlistSlugs(wishlist: any[]) {
  const arr: string[] = [];
  if (!wishlist) return arr;
  for (let item of wishlist) {
    arr.push(item?.property?.slug);
  }
  return arr;
}

export function getWishlistId(wishlist: any[], slug: string) {
  const item = wishlist?.find((item) => item?.property?.slug === slug);
  return item.id;
}

export function formatDateAndTime(dateString: string) {
  // Convert the given date string to a Date object
  const date = new Date(dateString);

  // Get current date
  const currentDate = new Date();

  // Check if the given date is today
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  // Format the time
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  if (isToday) {
    return `Today, ${hours}:${minutes}${ampm}`;
  } else {
    // If the date is not today, return the original formatted date string
    return date.toDateString() + ', ' + hours + ':' + minutes + ampm;
  }
}

type Amenity = {
  meta: string;
  name: string;
  value: boolean;
};

export function getBasicAmenities(amenities?: Amenity[]) {
  let obj: { [key: string]: any } = { bedrooms: null, bathrooms: null, parking: null };
  if (!amenities) {
    return obj;
  }
  let attr = ['bedrooms', 'bathrooms', 'parking', 'land size'];
  for (let item of amenities) {
    let key = item?.name.toLowerCase() ?? '';
    if (attr.includes(key) && item.value) {
      obj[key] = item.value;
    }
  }
  return obj;
}

export function removeDuplicateStrings(arr: string[]) {
  const newArr = new Set(arr);
  const cleanArr = Array.from(newArr);
  return cleanArr;
}

export function removeDuplicateTags(tags: string[] | { name: string }[]) {
  if (typeof tags[0] === 'string') {
    return removeDuplicateStrings(tags as string[]);
  } else {
    return removeDuplicateStrings((tags as { name: string }[]).map((tag) => tag.name));
  }
}

export function sortImagesInOrder(images: string[]) {
  if (!images?.[0]?.includes('-image')) {
    return images;
  }
  const sortedImages = [];
  for (let i = 0; i < images.length; i++) {
    const image = images.find((img) => img.includes(`${i}-image`));
    sortedImages.push(image);
  }

  return sortedImages;
}

export function formatDateString(date: string) {
  const dateString = formatDistance(subDays(new Date(date ?? ''), 0), new Date(), {
    addSuffix: true,
  });

  return dateString?.includes('about') ? dateString.replace('about', '') : dateString;
}
