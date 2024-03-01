import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  PaperAirplaneIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateAccreditation() {
  return (
    <Link
      href="/dashboard/accreditations/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Accreditation</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAccreditation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/accreditations/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
export function ViewAccreditation({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/accreditations/${id}/view`}
      // pointer-events needs to be removed to activate
      className="pointer-events-none rounded-md border p-2 hover:bg-gray-100"
    >
      <DocumentIcon className="w-5" />
    </Link>
  );
}

import { deleteAccreditation, transactAccreditation } from '@/app/lib/actions';

export function DeleteAccreditation({ id }: { id: string }) {
  const deleteAccreditationWithId = deleteAccreditation.bind(null, id);
  return (
    <>
      <form action={deleteAccreditationWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
export function TransactAccreditation({ id }: { id: string }) {
  const transactAccreditationWithId = transactAccreditation.bind(null, id);
  return (
    <>
      <form action={transactAccreditationWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Transact</span>
          <PaperAirplaneIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
