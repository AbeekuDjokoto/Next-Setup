import React from 'react';

import property from '@/public/assets/icons/city-solid.svg';
import dashboard from '@/public/assets/icons/dashboard.svg';
import setting from '@/public/assets/icons/gear-solid.svg';
import message from '@/public/assets/icons/message-regular.svg';
import { Heart } from 'lucide-react';
import addAdmin from '@/public/assets/icons/user-add.svg';
import profile from '@/public/assets/icons/user-solid.svg';
import announcement from '@/public/assets/icons/announcement.svg';

import {
  Promotions,
  PropertyType,
  Admin,
  Amenities,
  AmenityType,
  Customers,
  HostType,
  Subcriptions,
  Host,
} from '@/public/assets/icons';

export const ROUTES = {
  HOME: '/',
  FAQ: {
    CLIENT: '/faqs/client',
    HOST: '/faqs/host',
  },
  ABOUT_OWNKEY: '/about-ownkey',
  PRIVACY_POLICY: '/privacy-policy',
  PROPERTY_DETAILS: '/property',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  TERMS_OF_SERVICE: '/terms-of-service',
  FIND_HOST: '/host',
  SEARCH_PAGE: '/search',
  USER: {
    HOST: {
      AUTH: {
        CREATE_ACCOUNT: '/user/host/auth/register',
        LOGIN: '/user/host/auth',
        VERIFY: '/user/host/auth/verify',
        FORGOT_PASSWORD: '/user/host/auth/password-reset',
        REGISTER_HOST: '/user/host/auth/register/host',
      },
      DASHBOARD: {
        HOME: '/user/host/dashboard',
        PROFILE: '/user/host/dashboard/profile',
        NOTIFICATION: '/user/host/dashboard/notifications',
        MESSAGE: '/user/host/dashboard/message',
        PROPERTIES: '/user/host/dashboard/properties',
        CREATE_PROPERTIES: '/user/host/dashboard/properties/new',
        SUBSCRIPTIONS: '/user/host/dashboard/subscriptions',
        SETTINGS: '/user/host/dashboard/settings',
      },
    },
    CLIENT: {
      AUTH: {
        CREATE_ACCOUNT: '/user/client/auth/register',
        LOGIN: '/user/client/auth',
        VERIFY: '/user/client/auth/verify',
        FORGOT_PASSWORD: '/user/client/auth/password-reset',
      },
      DASHBOARD: {
        PROFILE: '/user/client/dashboard',
        NOTIFICATION: '/user/client/dashboard/notifications',
        MESSAGE: '/user/client/dashboard/message',
        WISHLIST: '/user/client/dashboard/wishlist',
        SETTINGS: '/user/client/dashboard/settings',
      },
    },
  },
  ADMIN: {
    AUTH: {
      LOGIN: '/admin',
    },
    DASHBOARD: {
      HOME: '/admin/dashboard',
      REVIEW: '/admin/dashboard/review',
      PROPERTIES: '/admin/dashboard/properties',
      PROPERTIES_TYPES: '/admin/dashboard/properties/types',
      HOSTS: '/admin/dashboard/hosts',
      HOST_TYPES: '/admin/dashboard/hosts/types',
      CLIENTS: '/admin/dashboard/clients',
      MESSAGES: '/admin/dashboard/messages',
      AMENITIES: '/admin/dashboard/properties/amenities',
      LISTING: '/admin/dashboard/properties/listing-types',
      ATTRIBUTES: '/admin/dashboard/properties/attributes',
      AMENITIES_TYPES: '/admin/dashboard/properties/amenities/types',
      SUBSCRIPTIONS: '/admin/dashboard/subscriptions',
      PROMOTIONS: '/admin/dashboard/promotions',
      ADMINS: '/admin/dashboard/adminstrators',
      ROLES: '/admin/dashboard/roles',
      VERIFICATION: '/admin/dashboard/hosts/verifications',
      ANNOUNCEMENT: '/admin/dashboard/announcements',
    },
  },
};

interface Link {
  pathLink: string;
  label: string;
  icon: React.ReactElement;
}

export const CLIENT_DASHBOARD_LINKS: Link[] = [
  {
    pathLink: ROUTES.USER.CLIENT.DASHBOARD.PROFILE,
    label: 'Profile',
    icon: profile,
  },
  // {
  //   pathLink: ROUTES.USER.CLIENT.DASHBOARD.NOTIFICATION,
  //   label: 'Notification',
  //   icon: announcement,
  // },
  {
    pathLink: ROUTES.USER.CLIENT.DASHBOARD.MESSAGE,
    label: 'Messenger',
    icon: message,
  },
  {
    pathLink: ROUTES.USER.CLIENT.DASHBOARD.WISHLIST,
    label: 'Wishlist',
    icon: Heart,
  },
  // {
  //   pathLink: ROUTES.USER.CLIENT.DASHBOARD.SETTINGS,
  //   label: 'Settings',
  //   icon: setting,
  // },
];
export const HOST_DASHBOARD_LINKS: Link[] = [
  {
    pathLink: ROUTES.USER.HOST.DASHBOARD.HOME,
    label: 'Dashboard',
    icon: dashboard,
  },
  {
    pathLink: ROUTES.USER.HOST.DASHBOARD.PROFILE,
    label: 'Profile',
    icon: profile,
  },
  // {
  //   pathLink: ROUTES.USER.HOST.DASHBOARD.NOTIFICATION,
  //   label: 'Notification',
  //   icon: announcement,
  // },
  {
    pathLink: ROUTES.USER.HOST.DASHBOARD.MESSAGE,
    label: 'Messenger',
    icon: message,
  },
  {
    pathLink: ROUTES.USER.HOST.DASHBOARD.PROPERTIES,
    label: 'Properties',
    icon: property,
  },
  // {
  //   pathLink: ROUTES.USER.HOST.DASHBOARD.SUBSCRIPTIONS,
  //   label: 'Subscriptions',
  //   icon: Subcriptions,
  // },
  // {
  //   pathLink: ROUTES.USER.HOST.DASHBOARD.SETTINGS,
  //   label: 'Settings',
  //   icon: setting,
  // },
];

export const ADMIN_DASHBOARD_LINKS = {
  dashboard: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.HOME,
      label: 'Dashboard',
      icon: dashboard,
    },
  ],

  customer: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.CLIENTS,
      label: 'Customer',
      icon: Customers,
    },
  ],
  host: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.HOSTS,
      label: 'Host',
      icon: Host,
    },
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.HOST_TYPES,
      label: 'Host Types',
      icon: HostType,
    },
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.VERIFICATION,
      label: 'Verifications',
      icon: Admin,
    },
  ],
  admin: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.ADMINS,
      label: 'Admins',
      icon: addAdmin,
    },
  ],
  propery: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.PROPERTIES,
      label: 'Properties',
      icon: property,
    },
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.PROPERTIES_TYPES,
      label: 'Property Types',
      icon: PropertyType,
    },
    { pathLink: ROUTES.ADMIN.DASHBOARD.LISTING, label: 'Listing Types', icon: Amenities },
    { pathLink: ROUTES.ADMIN.DASHBOARD.ATTRIBUTES, label: 'Property Attributes', icon: Amenities },
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.AMENITIES,
      label: 'Amenities',
      icon: Amenities,
    },
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.AMENITIES_TYPES,
      label: 'Amenities Types',
      icon: AmenityType,
    },
  ],
  message: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.MESSAGES,
      label: 'Announcements',
      icon: announcement,
    },
  ],
  subscription: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.SUBSCRIPTIONS,
      label: 'Subscriptions',
      icon: Subcriptions,
    },
  ],
  promotion: [
    {
      pathLink: ROUTES.ADMIN.DASHBOARD.PROMOTIONS,
      label: 'Promotions',
      icon: Promotions,
    },
  ],
};
