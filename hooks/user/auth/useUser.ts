import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { httpClient } from '@/config';
import { useAuthStore } from '@/stores/auth';

function useUser() {
  const { isAuthenticated, user: oldUser, accessToken, setUser } = useAuthStore((state) => state);

  const { data: user, refetch } = useQuery({
    queryKey: ['user', accessToken],
    queryFn: () => httpClient.get('/user'),
    enabled: false,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
    setUser(user);
  }, [isAuthenticated, accessToken, setUser, user, oldUser]);

  return { user };
}

export { useUser };
