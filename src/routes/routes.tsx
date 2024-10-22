import { type RouteObject } from 'react-router-dom';

import { WebsiteLayout } from '@/features/Website/components/Layout';
import { LandingPage, SearchPage } from '@/features/Website/pages';
import { ROUTES } from '@/utils/route-constants';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <WebsiteLayout />,
    children: [
      {
        path: ROUTES.WEBSITE,
        element: <LandingPage />,
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
