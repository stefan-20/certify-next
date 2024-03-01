'use client';

import { DocumentIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { updateAccreditation } from '@/lib/actions';
import { useFormState } from 'react-dom';

import { DatePicker } from '@/components/datepicker/datepicker';

export default function EditAccreditationForm({
  accreditation,
  accreditationTypes,
}: {
  accreditation: any;
  accreditationTypes: [];
}) {
  const initialState = { message: null, errors: {} };
  const updateAccreditationWithId = updateAccreditation.bind(
    null,
    accreditation.id,
  );
  const [state, dispatch] = useFormState(
    updateAccreditationWithId,
    initialState,
  );
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          {/* NAME */}
          <label
            htmlFor="accreditation"
            className="mb-2 block text-sm font-medium"
          >
            Enter a name <span className="text-red-500">*</span>
          </label>
          <div className="">
            <input
              type="text"
              placeholder="Enter a name"
              id="accreditation"
              name="accreditation"
              defaultValue={accreditation.name}
              className="peer block w-1/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
              required={true}
            />
          </div>
          {/* DESCRIPTION */}
          <label
            htmlFor="description"
            className="mb-2 mt-4 block text-sm font-medium"
          >
            Enter a description
          </label>
          <div className="">
            <textarea
              name="description"
              id="description"
              rows={3}
              placeholder="Enter a description"
              aria-describedby="name-error"
              className="peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={accreditation.description}
            ></textarea>
          </div>

          {/* FILE UPLOAD */}
          <label htmlFor="file" className="mb-2 mt-4 block text-sm font-medium">
            Upload a file
          </label>

          <div className="flex w-full items-center justify-start">
            <label
              id="dropzone-file"
              className="dark:hover:bg-bray-800 h-42 flex w-1/2 cursor-pointer flex-col items-center justify-start rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF,SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="file" type="file" className="hidden" />
            </label>
          </div>
          <label
            htmlFor="accreditationType"
            className="mb-2 mt-4 block text-sm font-medium"
          >
            Select type
          </label>
          <div className="relative">
            <select
              id="accreditationType"
              name="accreditationType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={accreditation.type}
              placeholder="Select an accreditation type"
              aria-describedby="accreditationType-error"
            >
              <option value="" disabled></option>
              {accreditationTypes.map((type, index) => (
                <option key={type + index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Valid dates */}
        <div className="flex w-1/2 flex-row justify-between">
          <div className="align-center flex flex-col justify-start">
            <label
              htmlFor="valid_from"
              className="mb-2 block text-sm font-medium"
            >
              Valid from
            </label>
            <div>
              <DatePicker
                id={'valid_from'}
                defaultDate={new Date(accreditation.valid_on!)}
              ></DatePicker>
            </div>
          </div>
          <div className="align-center flex flex-col justify-start">
            <label
              htmlFor="valid_until"
              className="mb-2 block text-sm font-medium"
            >
              Valid until
            </label>
            <div>
              <DatePicker
                id={'valid_until'}
                defaultDate={
                  accreditation.valid_until
                    ? new Date(accreditation.valid_until)
                    : null
                }
              ></DatePicker>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div id="amount-error" aria-atomic="true" aria-live="polite">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/accreditations"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Accreditation</Button>
      </div>
    </form>
  );
}
