import { type RouteObject } from 'react-router-dom';

import { WebsiteLayout } from '@/features/Website/components/Layout';
import {
  About,
  ContactSupport,
  FAQ,
  LandingPage,
  PrivacyPolicy,
  SearchPage,
  TermsAndConditions,
} from '@/features/Website/pages';
import { ROUTES } from '@/utils/route-constants';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <WebsiteLayout />,
    children: [
      { path: ROUTES.ABOUT, element: <About /> },
      {
        path: ROUTES.WEBSITE,
        element: <LandingPage />,
      },
      {
        path: ROUTES.TERMS_AND_CONDITIONS,
        element: <TermsAndConditions />,
      },
      {
        path: ROUTES.PRIVACY_POLICY,
        element: <PrivacyPolicy />,
      },
      {
        path: ROUTES.FAQ,
        element: <FAQ />,
      },
      {
        path: ROUTES.CONTACT_SUPPORT,
        element: <ContactSupport />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
];
