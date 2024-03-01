import Form from '@/components/ui/accreditations/create-form';
import Breadcrumbs from '@/components/ui/accreditations/breadcrumbs';
import { fetchAccreditationTypes } from '@/lib/data';

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
