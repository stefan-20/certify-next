import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/accreditations/breadcrumbs';
import { fetchNontransactedAccreditations, fetchUsers } from '@/app/lib/data';

export default async function Page() {
  const accrediations = await fetchNontransactedAccreditations();
  const users = await fetchUsers();
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

      <Form accreditations={accrediations} users={users} />
    </main>
  );
}
