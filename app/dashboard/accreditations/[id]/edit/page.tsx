import Form from '@/components/ui/accreditations/edit-form';
import Breadcrumbs from '@/components/ui/accreditations/breadcrumbs';
import { fetchAccreditationTypes } from '@/app/lib/data';
import { fetchAccreditationById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [Accreditation, accreditationTypes] = await Promise.all([
    fetchAccreditationById(id),
    fetchAccreditationTypes(),
  ]);

  if (!Accreditation) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Accreditations', href: '/dashboard/accreditations' },
          {
            label: 'Edit Accreditations',
            href: `/dashboard/accreditations/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        accreditation={Accreditation}
        accreditationTypes={accreditationTypes}
      />
    </main>
  );
}
