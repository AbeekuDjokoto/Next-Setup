import { ROUTES } from '@/utils';
import buyaprop from '@/public/assets/icons/buyaprop.svg';
import rentaprop from '@/public/assets/icons/rentaprop.svg';
import listaprop from '@/public/assets/icons/listaprop.svg';

export const callToActionData = [
  {
    id: 1,
    icon: buyaprop,
    title: 'Buy a property',
    description: `Explore a diverse selection of residential
    properties for sale in Ghana. Your dream
    home can be just a click away. Let's find it
    together!`,
    btnText: 'Find a home',
    btnPath: ROUTES.HOME,
  },
  {
    id: 2,
    icon: rentaprop,
    title: 'Rent a property',
    description: `Use powerful search tools with filters to
    find the ideal home or apartment for rent.
    Discover the place that matches your
    budget and lifestyle.`,
    btnText: 'Find a rental',
    btnPath: ROUTES.HOME,
  },
  {
    id: 3,
    icon: listaprop,
    title: 'Get a helper',
    description: `Ownkey is your trusted source for real
    estate professionals with in-depth
    neighborhood insights. Let our agents
    guide you home.`,
    btnText: 'List a property',
    btnPath: ROUTES.USER.HOST.AUTH,
  },
];
