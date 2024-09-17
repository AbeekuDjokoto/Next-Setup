import { useAuthStore } from '@/stores';
import { useModal } from '.';
import { useWishlistProperty } from '@/hooks/user';

export function useWishlist() {
  const { onAddToWishlist, onRemoveFromWishlist } = useWishlistProperty();
  const { showModal, openModal, closeModal, contentType } = useModal();
  const { isAuthenticated } = useAuthStore();

  function addItemToWishlist(item: string) {
    if (!isAuthenticated) {
      openModal('sign-in');
    } else {
      onAddToWishlist({ property_slug: item });
    }
  }
  function removeItemFromWishlist(wishlistId: number) {
    if (!isAuthenticated) {
      openModal('sign-in');
    } else {
      onRemoveFromWishlist(wishlistId);
    }
  }
  return {
    addItemToWishlist,
    removeItemFromWishlist,
    showModal,
    openModal,
    closeModal,
    contentType,
  };
}
