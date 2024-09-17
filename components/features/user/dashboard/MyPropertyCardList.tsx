import { PropertyType } from '@/types';
import { MyPropertyCard } from '.';

type MyPropertyCardList = {
  isWishlist?: boolean;
  properties: PropertyType[];
};
function MyPropertyCardList({ properties, isWishlist }: MyPropertyCardList) {
  return (
    <div className="grid gap-4 py-4 md:max-h-[85vh] overflow-y-auto noscroll-indicator">
      {properties?.map((property) => {
        return <MyPropertyCard key={property.slug} property={property} />;
      })}
    </div>
  );
}

export { MyPropertyCardList };
