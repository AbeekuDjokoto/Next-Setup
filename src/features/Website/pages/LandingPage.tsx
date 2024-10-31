import { mockProperties } from '@/mocks';
import { AgentsCard, PropertyCard } from '@/shared';

import { Header } from '../components';

export function LandingPage() {
  return (
    <main className="pt-6 pb-12 flex flex-col gap-20">
      <Header />
      <div className="flex flex-col gap-12">
        <div className="max-w-[672px] w-full mx-auto text-center">
          <h2 className="text-[32px] font-medium">Trusted By a Million Renters and Buyers</h2>
          <p className="text-base text-[#020817]">
            Only ownkey.com connects you to the person who owns or knows the most about a property
            for sale or for rent in Ghana
          </p>
        </div>
      </div>

      {/* Featured Listings */}

      <section className="px-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">Featured Listings</h2>
          <div className="flex gap-2">
            <div className="py-3 px-4 border-b-4 border-b-[var(--red-100)]">Buy</div>
            <div className="py-3 px-4">Rent</div>
            <div className="py-3 px-4">Stays</div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] justify-between gap-[34.5px]">
          {mockProperties
            .filter((_, index) => index < 4)
            .map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
        </div>
      </section>

      {/* New Listings */}

      <section className="px-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">New Listings</h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] justify-between gap-[34.5px]">
          {mockProperties
            .filter((_, index) => index < 4)
            .map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
        </div>
      </section>

      {/* Featured Agents */}

      <section className="px-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">Featured Agents</h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] justify-between gap-[34.5px]">
          {mockProperties
            .filter((_, index) => index < 4)
            .map((property) => (
              <AgentsCard key={property.id} {...property} />
            ))}
        </div>
      </section>
    </main>
  );
}
