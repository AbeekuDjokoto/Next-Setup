import { Navigate } from 'react-router';

import { useAuthStore } from '@/stores';
import { ROUTES } from '@/utils/route-constants';

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return <>{isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />}</>;
};
