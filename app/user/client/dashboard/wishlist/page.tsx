'use client';

import { WishlistCardList } from '@/components/features/user';
import { useWishlistProperty } from '@/hooks/user';
import { Spinner } from '@/components/shared/Loaders';

export default function Wishlist() {
  const { wishlist, isLoading } = useWishlistProperty();

  return (
    <div className="grid gap-4 py-3">
      <h1 className="text-2xl">Wishlist Properties</h1>

      <>
        {isLoading ? (
          <div className="w-full grid place-items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {wishlist?.filter((item) => item?.property != null).length > 0 ? (
              <WishlistCardList wishlist={wishlist} isWishlist />
            ) : (
              <div>Wishlisted Properties will show here.</div>
            )}
          </>
        )}
      </>
    </div>
  );
}
