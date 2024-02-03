import Image from 'next/image';
import { UpdateAccreditation } from '@/app/ui/accreditations/buttons';
import { NotifyTransaction, CancleTransaction } from './buttons';
import { fetchFilteredTransactions } from '@/app/lib/data';
import TransactionStatus from './status';

// type Transaction = {
//   id: string;
//   accreditation_id: string;
//   status:string;
//   from_id: string;
//   to_id: string;
//   created_on: Date | null;
//   accreditation: any;
//   to: any;
//   from: any

// };

export default async function TransactionsTable({ query, currentPage }) {
  const transactions = await fetchFilteredTransactions(query, currentPage);
  console.log(transactions);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* TODO: REQUIRES MOBILE ADAPTION */}
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
                  Accreditation name
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Transacted from
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Transacted to
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Transacted on
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Number of change requests
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>

                <th
                  scope="col"
                  className="relative flex justify-between py-3 pl-6 pr-3"
                >
                  <span className="font-large text-right">Notify</span>
                  <span className="font-large text-right">Edit</span>
                  <span className="font-large text-right">Cancel</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{transaction.accreditation.name}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{transaction.from.email}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{transaction.to.email}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{new Date(transaction.created_on).toDateString()}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* TODO: add notification information */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TransactionStatus
                      status={transaction.status}
                    ></TransactionStatus>
                  </td>

                  <td className="flex justify-between whitespace-nowrap py-3 pl-6 pr-3">
                    <NotifyTransaction id={transaction.id}></NotifyTransaction>
                    <UpdateAccreditation id={transaction.accreditation_id} />
                    <CancleTransaction id={transaction.id} />
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
