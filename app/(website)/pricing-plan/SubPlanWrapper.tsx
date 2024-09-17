'use client';

import { PricingPlanCard } from '@/components/features/user/subscription/PricingPlanCard';
import { TabsUnderline } from '@/components/shared';
import { useTabs } from '@/hooks/shared';

interface Props {
  id: number;
  name: string;
  benefits: string[];
  pricing: { amount: number; duration: string, id: number }[];
  sequence: number;
}

interface PricingPlanWrapperProps {
  pricing: Props[];
}

export const PricingPlanWrapper = ({pricing}: PricingPlanWrapperProps) => {
  const { tabs, setActiveTab, active } = useTabs(
    [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Quarterly', value: 'quarterly' },
      { label: 'Yearly', value: 'yearly' },
    ],
    'monthly',
  );

  // * Sort by the 'sequence' field
  const sortedPlans = pricing.sort((a, b) => a.sequence - b.sequence);

  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-7">Choose your subscription plan</h2>
            <div className="flex justify-center">
              <TabsUnderline tabs={tabs} setActiveTab={setActiveTab} active={active} />
            </div>
          </div>

          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0">
            {sortedPlans.map((plan) => {
              const currentPrice = plan.pricing.find(
                (p) => p.duration.toLowerCase() === active,
              ) || {
                amount: 0,
                duration: active,
              };
              return (
                <PricingPlanCard
                  key={plan.id}
                  title={plan.name}
                  price={currentPrice}
                  benefits={plan.benefits}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
