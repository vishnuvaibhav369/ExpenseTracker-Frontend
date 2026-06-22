import {useQuery} from "@tanstack/react-query";
import {listTransactionsAPI} from "../../services/transactions/transactionService";

const Totals = () => {
    const {
        data: transactions,
        isError, isLoading, isFetching, error, refetch}
        = useQuery({
            queryFn: listTransactionsAPI,
            queryKey: ['list-transactions']
        });
    const totals = transactions?.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income')
                 {acc.income += transaction.amount;}
            else {acc.expense += transaction.amount;}
            return acc;
        },
        {income: 0, expense: 0}    
    )
    return (
        <div className="my-8 p-6 bg-white rounded-lg shadow border border-gray-200 w-full">
      <h1 className="text-2xl font-bold text-center mb-6">
        Income vs Expenditure
      </h1>
      <div className="flex flex-col text-center">
        <div className="p-4 m-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700">Total Income</h2>
          <p className="text-2xl font-bold text-green-800 mt-2">
            ₹{totals?.income.toLocaleString()}
          </p>
        </div>
        <div className="p-4 m-4 bg-red-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-700">Total Expenditure</h2>
          <p className="text-2xl font-bold text-red-800 mt-2">
            ₹{totals?.expense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
    )
};

export default  Totals;