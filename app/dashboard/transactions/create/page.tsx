import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/accreditations/breadcrumbs';
import { fetchNontransactedAccreditations, fetchUsers } from '@/app/lib/data';
import { Suspense } from 'react';
import { AccreditationsTableSkeleton } from '@/app/ui/skeletons';
export default async function Page() {
  const [accrediations, users] = await Promise.all([
    fetchNontransactedAccreditations(),
    fetchUsers(),
  ]);

  console.log('HERE!!!!!!!!');
  console.log(accrediations);
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
