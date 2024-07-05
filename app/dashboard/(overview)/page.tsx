import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  CardSkeleton
} from '@/app/ui/skeletons';
import { Suspense } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';

export default async function Page() {

  return (
    <main>
      <h1 className="text-3xl font-semibold">Dashboard Page</h1>
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
