// import React, { useEffect, useState } from "react";
// import PageTitle from "../../../components/PageTitle/PageTitle";
// import { addFunds, GetTheWallet } from "../../../services/Wallet";
// import { loadStripe } from "@stripe/stripe-js";

// const LawyerWalletPage: React.FC = () => {
//   const [value, setValue] = useState<number | undefined>(undefined);
//   const [transaction, setTransactions] = useState<any[]>([]);
//   const [balance, setBalance] = useState<number>(0);

//   const transactions = transaction.map((obj) => ({
//     id: obj.pk,
//     type: obj.transaction_type,
//     amount: obj.amount,
//     date: obj.created_at,
//   }));

//   const handleAddFunds = async (amount: number) => {
//     try {
//       const data = await addFunds(amount);

//       if (!process?.env.VITE_CLIENT_ID) {
//         throw new Error("Something wrong with stripe key");
//       }
//       const stripe = await loadStripe(
//         "pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y"
//       );
//       if (!stripe) {
//         throw new Error("Failed to load Stripe.");
//       }

//       const { error } = await stripe.redirectToCheckout({
//         sessionId: data.sessionId,
//       });

//       if (error) {
//         console.error("Error redirecting to checkout:", error);
//         alert("Failed to redirect to checkout. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding funds:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await GetTheWallet();
//         setTransactions(data.balance_history);
//         setBalance(data.balance);
//       } catch (error) {
//         console.error("Error fetching wallet data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.valueAsNumber;
//     setValue(newValue);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-transparent text-gray-900">
//       <PageTitle
//         description="Manage your finances effortlessly with a clear overview of transactions and balances."
//         title="WALLET"
//       />

//       <div className="w-full mb-10 border border-gray-300 max-w-6xl xl:h-[400px] bg-gray-100 shadow-md rounded-lg p-4 flex flex-col xl:flex-row gap-4">
//         {/* Wallet Balance Section */}
//         <div className="xl:w-1/3 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
//           <div className="flex flex-col items-center gap-10">
//             <p className="text-lg font-medium text-gray-500 max-[400px]:text-base text-center max-sm:text-lg">Available Balance</p>
//             <p className="text-5xl max-sm:text-3xl font-bold text-black mt-4">₹{balance}</p>
//           </div>
//           <div className="space-y-4  flex flex-col items-center mt-6">
//             <input
//               type="number"
//               onChange={handleChange}
//               className="w-full border max-w-xl  text-sm max-sm:text-xs border-gray-300 p-3 rounded-md text-gray-700"
//               placeholder="Enter Value"
//             />
//             <div className="flex max-[400px]:flex-col max-[400px]:gap-2 gap-4 justify-center">
//               <button
//                 className="bg-black text-sm max-sm:text-xs text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
//                 onClick={() => value && handleAddFunds(value)}
//               >
//                 Add Funds
//               </button>
//               <button className="bg-gray-200 text-sm max-sm:text-xs text-gray-600 py-2 px-4 rounded-md hover:bg-gray-300 transition">
//                 Withdraw
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Recent Transactions Section */}
//         <div className="xl:w-2/3 max-h-[370px] overflow-y-auto no-scrollbar bg-white shadow-lg rounded-lg p-4">
//           <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Recent Transactions</h2>
//           {transactions.length === 0 ? (
//             <p className="text-gray-500 text-center">No transactions available.</p>
//           ) : (
//             <ul className="space-y-4">
//               {transactions.map((transaction) => (
//                 <li
//                   key={transaction.id}
//                   className="p-4 max-[400px]:flex-col max-[400px]:text-center bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center"
//                 >
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-700">{transaction.type}</p>
//                     <p className="text-xs text-gray-500">{transaction.date}</p>
//                   </div>
//                   <div className="text-right mt-2">
//                     <p
//                       className={`text-lg font-semibold ${
//                         transaction.type === "credit" ? "text-green-500" : "text-red-500"
//                       }`}
//                     >
//                       {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LawyerWalletPage;
import React, { useState, useEffect } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { addFunds, GetTheWallet, withdrawMoney } from "../../../services/Wallet";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "../../../components/Modal/Modal";
import { useToast } from "../../../components/Toast/ToastManager";

const LawyerWalletPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState<number|null>(null);
  const [withdrawUpi, setWithdrawUpi] = useState("");
  const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
 const {addToast}=useToast()
  const handleAddFunds = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    try {
      const data = await addFunds(parseFloat(amount));

      if (!process.env.VITE_CLIENT_ID) {
        throw new Error("Invalid Stripe key.");
      }

      const stripe = await loadStripe(
        "pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y"
      );

      if (!stripe) {
        throw new Error("Failed to load Stripe.");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount  && withdrawAmount!= null && withdrawUpi){
      try {
       if (withdrawAmount>0){
        const response = await withdrawMoney(withdrawAmount,withdrawUpi);
        console.log(`Withdrawing ���${withdrawAmount}`);
        console.log(response);
        addToast('success','money withdraw initiated successfully')
        setWithdrawModal(false);
       }else{
        addToast('info','Withdrawal amount should be greater than zero')
       }
        
      } catch (error:any) {
        console.error("Error withdrawing funds:", error);
        addToast('danger',error.response ? error.response.data.error : error.message)
      }finally{
        setWithdrawAmount(0);
        setWithdrawUpi("");
      }
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTheWallet();
        setTransactions(data.balance_history);
        setBalance(data.balance);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl max-sm:text-2xl font-bold text-gray-800 mb-8">
          WALLET DASHBOARD
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Balance Section */}
          <div className="bg-white shadow rounded-lg h-[300px]">
            <div className="p-4 border-b">
              <h2 className="flex items-center text-xl font-semibold">
                <Wallet className="mr-2" /> Current Balance
              </h2>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-slate-700">
                ₹{balance.toFixed(2)}
              </p>
              <div className="mt-6">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border p-2 rounded mb-4 focus:outline-none"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddFunds}
                    className="w-full bg-slate-700 text-white py-2 rounded flex items-center justify-center"
                  >
                    <ArrowUpRight className="mr-2" /> Add Funds
                  </button>
                  <button onClick={() => setWithdrawModal(true)} className="w-full border border-gray-400 text-gray-700 py-2 rounded flex items-center justify-center">
                    <ArrowDownLeft className="mr-2" /> Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white shadow rounded-lg h-[500px] overflow-y-scroll no-scrollbar">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <p className="text-gray-500">Your latest financial activities</p>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-gray-500 py-4">
                          No transactions available.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx,index) => (
                        <tr key={index} className="border-b text-[13px] hover:bg-gray-50">
                          <td className="p-2">
                            {tx.transaction_type === "credit" ? (
                              <span className="text-green-600 flex items-center">
                                <ArrowUpRight className="mr-1" size={16} /> Credit
                              </span>
                            ) : (
                              <span className="text-red-600 flex items-center">
                                <ArrowDownLeft className="mr-1" size={16} /> Debit
                              </span>
                            )}
                          </td>
                          <td className="p-2">
                            <span
                              className={tx.transaction_type === "credit" ? "text-green-600" : "text-red-600"}
                            >
                              ₹{tx.amount}
                            </span>
                          </td>
                          <td className="p-2">{tx.created_at}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Modal */}
        <Modal modalOpen={withdrawModal} setModalOpen={() => setWithdrawModal(!withdrawModal)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Withdraw Money</h2>
            <div className="mt-4">
              <label className="block mb-2">Amount:</label>
              <input 
                type="number" 
                value={withdrawAmount!=null ?withdrawAmount:''}
                min={0}
                onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                className="border p-2 rounded w-full"
                max={balance.toFixed(2)}
              />
              <label className="block mb-2">Upi:</label>
              <input 
                type="text" 
                value={withdrawUpi}
                onChange={(e) => setWithdrawUpi(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleWithdraw}
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Confirm Withdraw
                </button>
                <button
                  onClick={() => setWithdrawModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LawyerWalletPage;

