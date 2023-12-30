import Form from '@/app/ui/accreditations/create-form';
import Breadcrumbs from '@/app/ui/accreditations/breadcrumbs';
import { fetchAccreditationTypes } from '@/app/lib/data';

export default async function Page() {
  const accreditationTypes = await fetchAccreditationTypes();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Accreditations', href: '/dashboard/accreditations' },
          {
            label: 'Create Accreditation',
            href: '/dashboard/accreditations/create',
            active: true,
          },
        ]}
      />
      <Form accreditationTypes={accreditationTypes} />
    </main>
  );
}
