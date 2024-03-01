'use client';
import Link from 'next/link';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { createTransaction } from '@/lib/actions';
import { useFormState } from 'react-dom';

import { Switch } from '@nextui-org/react';

export default function Form({
  accreditations,
  users,
}: {
  accreditations: any;
  users: any;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTransaction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          {/* NAME */}
          <label
            htmlFor="accreditation"
            className="mb-2 block text-sm font-medium"
          >
            Select an accrediation <span className="text-red-500">*</span>
          </label>
          <div className="">
            <div className="relative w-1/4">
              <select
                id="accreditation"
                name="accreditation"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Select one of your accreditations..."
                required={true}
                // aria-describedby="accreditationType-error"
              >
                <option value="" disabled></option>
                {accreditations.map((accreditation) => (
                  <option key={accreditation.id} value={accreditation.id}>
                    {accreditation.name}
                  </option>
                ))}
              </select>
              <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          {/* DESCRIPTION */}
          <label
            htmlFor="description"
            className="mb-2 mt-4 block text-sm font-medium"
          >
            Enter an email address <span className="text-red-500">*</span>
          </label>
          <div className="">
            <div className="relative w-1/4">
              <select
                id="userTo"
                name="userTo"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Select a user to transact to..."
                required={true}
              >
                <option value="" disabled></option>
                {users.map((user, index) => (
                  <option key={user.email + index} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
              <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* FILE UPLOAD */}
          <label htmlFor="file" className="mb-2 mt-4 block text-sm font-medium">
            Do you want to schedule a reminder?
          </label>

          <div className="flex w-full items-center justify-start">
            <Switch
              defaultSelected
              id="notifications"
              name="notifications"
              aria-label="Notifications"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/transactions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Transaction</Button>
      </div>
    </form>
  );
}
