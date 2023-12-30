import { ViewAccreditation } from '@/app/ui/accreditations/buttons';

export default async function ValidationTable({
  accreditations,
}: {
  accreditations: [];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">
            {accreditations?.map((accreditation) => (
              <div
                key={accreditation.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={accreditation.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${accreditation.name}'s profile picture`}
                      />
                      <p>{accreditation.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{accreditation.email}</p>
                  </div>
                  <LastTransactionStatus status={accreditation.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateAccreditation id={invoice.id} />
                    <DeleteAccreditation id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Valid From
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Valid Until
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created By
                </th>
                <th
                  scope="col"
                  className="relative flex justify-between py-3 pl-6 pr-3"
                >
                  <span className="font-large text-right">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {accreditations?.map((accreditation) => (
                <tr
                  key={accreditation.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{accreditation.name}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{accreditation.description}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>
                      {accreditation.valid_from &&
                        new Date(accreditation.valid_from).toDateString()}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>
                      {accreditation.valid_until &&
                        new Date(accreditation.valid_until).toDateString()}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {accreditation.type}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {accreditation.creator.name}
                  </td>
                  <td className="flex justify-between whitespace-nowrap py-3 pl-6 pr-3">
                    <ViewAccreditation id={accreditation.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
