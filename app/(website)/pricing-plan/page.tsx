import { httpClient } from '@/config';
import { PricingPlanWrapper } from './SubPlanWrapper';

export default async function PricingPlanPage() {
  const res: any = await httpClient('/subscriptions');

  return <PricingPlanWrapper pricing={res} />;
}
