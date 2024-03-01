import React from 'react';

// import RevenueChart from '../../ui/dashboard/revenue-chart';
// import LatestInvoices from '../../ui/dashboard/latest-invoices';
import { lusitana } from '../../../components/ui/fonts';
import { Suspense } from 'react';
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/components/ui/skeletons';
import CardWrapper from '@/components/ui/dashboard/cards';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Suspense fallback={<CardsSkeleton></CardsSkeleton>}>
          <CardWrapper></CardWrapper>
        </Suspense> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <Suspense fallback={<RevenueChartSkeleton></RevenueChartSkeleton>}>
          <RevenueChart></RevenueChart>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton></LatestInvoicesSkeleton>}>
          <LatestInvoices></LatestInvoices>
        </Suspense> */}
      </div>
    </main>
  );
}
