import { CheckIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function LastTransactionStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-black': status === null,
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'confirmed',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'confirmed' ? (
        <>
          Confirmed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === null ? (
        <>
          Not Transacted
          <XCircleIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
    </span>
  );
}
