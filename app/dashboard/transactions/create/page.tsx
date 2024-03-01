import Form from '@/components/ui/transactions/create-form';
import Breadcrumbs from '@/components/ui/accreditations/breadcrumbs';
import { fetchNontransactedAccreditations, fetchUsers } from '@/lib/data';
import { Suspense } from 'react';
import { AccreditationsTableSkeleton } from '@/components/ui/skeletons';
export default async function Page() {
  const [accrediations, users] = await Promise.all([
    fetchNontransactedAccreditations(),
    fetchUsers(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/transactions' },
          {
            label: 'Create Transaction',
            href: '/dashboard/transactions/create',
            active: true,
          },
        ]}
      />
      <Suspense key={'test'} fallback={<AccreditationsTableSkeleton />}>
        <Form accreditations={accrediations} users={users} />
      </Suspense>
    </main>
  );
}
