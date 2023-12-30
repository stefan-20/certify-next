import Link from 'next/link';
import {
  PlusIcon,
  BellAlertIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export function CreateTransaction() {
  return (
    <Link
      href="/dashboard/transactions/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Transaction</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function NotifyTransaction({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transactions`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <BellAlertIcon className="w-5" />
    </Link>
  );
}
export function CancleTransaction({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/transactions`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}
