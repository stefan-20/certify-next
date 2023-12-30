import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export function ValidateUser({ userId }: { userId: string | null }) {
  return (
    <Link
      href={`/dashboard/validation/${userId}/view`}
      className={`${
        !userId ? 'pointer-events-none' : ''
      }  flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
    >
      <span className="hidden md:block">Validate User</span>{' '}
      <CheckCircleIcon className="h-5 md:ml-4" />
    </Link>
  );
}
