// import Form from '@/components/ui/accreditations/edit-form';
import Breadcrumbs from '@/components/ui/accreditations/breadcrumbs';
import {
  fetchAccreditationTypes,
  fetchValidationAccreditationsByUserID,
} from '@/lib/data';
// import { notFound } from 'next/navigation';
import ValidationTable from '@/components/ui/validation/table';

import { auth } from '@/auth';
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [accreditations] = await Promise.all([
    fetchValidationAccreditationsByUserID(id),
  ]);
  console.log(accreditations);
  //   if (!Accreditation) {
  //     notFound();
  //   }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Validation', href: '/dashboard/validation' },
          {
            label: `View Accreditations`,
            href: `/dashboard/validation/${id}/view`,
            active: true,
          },
        ]}
      />
      {/* REQUIRES A TABLE */}

      <ValidationTable accreditations={accreditations} />
    </main>
  );
}
