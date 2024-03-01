import Pagination from '@/components/ui/accreditations/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/ui/accreditations/table';
import { CreateAccreditation } from '@/components/ui/accreditations/buttons';
import { lusitana } from '@/components/ui/fonts';
import { AccreditationsTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';

import { fetchInvoicesPages } from '@/lib/data';

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
  // const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Accreditations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search accreditations..." />
        <CreateAccreditation />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<AccreditationsTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
