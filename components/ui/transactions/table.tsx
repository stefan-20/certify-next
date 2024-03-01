import { UpdateAccreditation } from '@/components/ui/accreditations/buttons';
import { NotifyTransaction, CancleTransaction } from './buttons';
import { fetchFilteredTransactions } from '@/lib/data';
import TransactionStatus from './status';

export default async function TransactionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const transactions = await fetchFilteredTransactions(query, currentPage);
  console.log(transactions);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                    <p>
                      {transaction.created_on &&
                        new Date(transaction.created_on).toDateString()}
                    </p>
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
