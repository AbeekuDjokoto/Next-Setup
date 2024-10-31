export const ROUTES = {
  WEBSITE: '/',
  SEARCH: '/search',
  ABOUT: '/about',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  PRIVACY_POLICY: '/privacy-policy',
  FAQ: '/faq',
  CONTACT_SUPPORT: '/contact',
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
};
