import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useAuthStore } from '@/stores';
import { PropertyType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

export function useWishlistProperty() {
  const { isAuthenticated } = useAuthStore();
  const { successToast, errorToast } = useToastify();
  const {
    data,
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () =>
      httpClient.get(`/user/wishlist`) as unknown as Promise<{
        page: number;
        result: { id: number; property: PropertyType }[];
        total: number;
      }>,
    enabled: false,
  });

  const { mutate } = useMutation({
    mutationFn: (data: { property_slug: string }) => {
      return httpClient.post('/user/wishlist', data);
    },
    onSuccess: async () => {
      refetch();
      successToast('Successfully added to Wishlist');
    },
    onError: async () => {
      errorToast('Failed to add to Wishlist');
    },
  });

  const { mutate: onRemoveFromWishlist } = useMutation({
    mutationFn: (wishlistId: number) => {
      return httpClient.delete(`/user/wishlist/${wishlistId}`);
    },
    onSuccess: async () => {
      refetch();
      successToast('Successfully removed from Wishlist');
    },
    onError: async () => {
      errorToast('Failed to remove from Wishlist');
    },
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return {
    onAddToWishlist: mutate,
    onRemoveFromWishlist,
    isLoading,
    wishlist: data?.result ?? [],
  };
}
