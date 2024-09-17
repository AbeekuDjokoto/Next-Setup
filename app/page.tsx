'use client';

import { PropertyListSkeleton } from '@/components/shared';
import { ExploreHomes, Hero, PropertyListCategory } from '@/components/features/website';
import { useNewlyListedProperties, useFeaturedProperties } from '@/hooks/shared';
import { ROUTES } from '@/utils';

export default function Home() {
  const { properties: newlyListedProperties, isLoading: isLoadingNewlyListed } =
    useNewlyListedProperties();
  const { properties: featuredProperties, isLoading: isLoadingFeaturedProperties } =
    useFeaturedProperties();

  return (
    <main className="container w-full flex flex-col gap-[80px] py-6">
      {/* changes to staging branch */}
      <Hero />

      <div className="grid gap-16">
        {isLoadingFeaturedProperties ? (
          <PropertyListSkeleton />
        ) : (
          <PropertyListCategory
            cardSize="large"
            link=""
            properties={featuredProperties}
            title="Featured Listings"
          />
        )}

        <div className="grid place-items-center gap-6 max-w-2xl m-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-center">
            Trusted By a Million Ghanaians and Expatriates
          </h2>
          <p className="text-base text-center">
            Only ownkey.com connects you directly to the person who owns or knows the most about a
            property for sale or for rent in Ghana
          </p>
        </div>

        {/* <PromotedProperty
          cardSize="small"
          link=""
          products={newlyListedProperties}
          title="Luxury Listings"
        /> */}

        {isLoadingNewlyListed ? (
          <PropertyListSkeleton />
        ) : (
          <PropertyListCategory
            cardSize={'large'}
            link={ROUTES.SEARCH_PAGE}
            properties={newlyListedProperties}
            title="New Listings"
          />
        )}

        {/* <CallToActionList actions={callToActionData} /> */}

        <ExploreHomes />
      </div>
    </main>
  );
}
