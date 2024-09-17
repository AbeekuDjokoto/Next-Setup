'use client';
import React from 'react';

import { TotalPropertyCard, RentSaleCard } from '@/components/features/admin';

function Dashboard() {
  return (
    <div className="grid gap-6 py-6">
      <TotalPropertyCard />

      <div className="flex flex-col gap-4 md:flex-row">
        <RentSaleCard variant="Sale" total={175} />
        <RentSaleCard variant="Rent" total={2450} />
      </div>
    </div>
  );
}

export default Dashboard;
