import { PropertyType } from '@/types';
import { MyPropertyCard } from '@/components/features/user';

type Props = {
  isWishlist?: boolean;
  wishlist: { id: number; property: PropertyType }[];
};

export function WishlistCardList({ wishlist, isWishlist }: Props) {
  return (
    <div className="grid gap-4 py-4 md:max-h-[85vh] overflow-y-auto noscroll-indicator">
      {wishlist
        ?.filter((item) => item.property != null)
        ?.map((data) => {
          return (
            <MyPropertyCard
              key={data?.id}
              property={data?.property}
              isWishlist={isWishlist}
              wishlistId={data.id}
            />
          );
        })}
    </div>
  );
}
