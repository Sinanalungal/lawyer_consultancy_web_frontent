import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { addFunds, GetTheWallet } from "../../../services/Wallet";
import { loadStripe } from "@stripe/stripe-js";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  date: string;
}

const AdminWalletPage: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [transaction, setTransactions] = useState<any[] >([]);
  const [balance,setBalance] = useState<number >(0);
  const transactions: Transaction[] = transaction.map((obj)=>({ id:obj.pk , type: obj.transaction_type, amount: obj.amount, date: obj.created_at}))

  const handleAddFunds = async (amount: number) => {
    try {
      const data = await addFunds(amount);
      console.log(data);
      
      if (!(process?.env.VITE_CLIENT_ID)) {
        throw new Error("Something wrong with stripe key");
      }
      const stripe = await loadStripe("pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y");
      if (!stripe) {
        throw new Error("Failed to load Stripe.");
      }
      console.log(stripe);
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
        alert("Failed to redirect to checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTheWallet();
        setTransactions(data.balance_history);
        console.log(data.balance_history);
        console.log(data.balance)
        setBalance(data.balance)
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        
      }
    };

    fetchData();
  }, []);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    setValue(newValue);
  };

  return (
    <AdminLayout selected="8">
    <div className="min-h-screen p-8 flex flex-col items-center text-gray-800">
      <PageTitle description="Manage your finances effortlessly with a clear overview of transactions and balances." title="WALLET" />

      <div className="w-full max-w-4xl xl:h-[400px] bg-white gap-1 shadow-md rounded-lg p-1 flex flex-col xl:flex-row">
        {/* Wallet Balance Section */}
        <div className="xl:w-1/3 rounded-md xl:p-4 max-xl:h-[300px] max-lg:flex-col max-lg:p-6 bg-gray-50 shadow-sm mb-8 md:mb-0 flex xl:flex-col justify-between">
          <div className="sm:p-6 rounded-lg my-auto max-lg:mx-auto items-center flex flex-col">
            <p className="text-lg font-medium text-center text-gray-600 max-[400px]:text-sm">Available Balance</p>
            <p className="text-4xl font-bold text-gray-900 mt-6 max-[400px]:text-2xl">₹{balance}</p>
          </div>
          <div className="space-y-1">
            <input 
              type="number" 
              onChange={handleChange} 
              className="w-full border text-xs p-3 rounded-md"  
              placeholder="Enter Value" 
            />
            <div className="xl:mt-6 lg:mr-6 xl:mr-0 lg:h-[40px] lg:my-auto flex flex-wrap gap-1 max-[400px]:justify-start justify-center text-xs">
              <button 
                className="bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-900 transition"
                onClick={() => value && handleAddFunds(value)}
              >
                Add Funds
              </button>
              <button className="bg-gray-300 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-400 transition">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="xl:w-2/3 max-xl:h-[350px] overflow-y-scroll no-scrollbar">
          <h2 className="text-xl font-semibold md:mt-6 xl:mt-0 text-gray-700 mb-4 text-center p-2">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className=" text-gray-500 flex justify-center h-[250px] text-xs items-center">No transactions available.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm text-sm flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{transaction.type}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
                    </p>
                    <p className={`text-xs font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminWalletPage;
