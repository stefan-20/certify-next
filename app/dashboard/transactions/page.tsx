import { lusitana } from '@/components/ui/fonts';
import Search from '@/components/ui/search';

import { CreateTransaction } from '@/components/ui/transactions/buttons';
import { Suspense } from 'react';
import { TransactionsTableSkeleton } from '@/components/ui/skeletons';

import TransactionsTable from '@/components/ui/transactions/table';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Transactions</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search transactions..." />
        <CreateTransaction />
      </div>
      {/* Table to view transactions */}

      <Suspense
        key={query + currentPage}
        fallback={<TransactionsTableSkeleton />}
      >
        <TransactionsTable
          query={query}
          currentPage={currentPage}
        ></TransactionsTable>
      </Suspense>
    </div>
  );
}
