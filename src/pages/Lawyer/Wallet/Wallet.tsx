import React, { useState, useEffect } from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import {
  addFunds,
  GetTheWallet,
  withdrawMoney,
} from "../../../services/Wallet";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "../../../components/Modal/Modal";
import { useToast } from "../../../components/Toast/ToastManager";

const LawyerWalletPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState<number | null>(null);
  const [withdrawUpi, setWithdrawUpi] = useState("");
  const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
  const { addToast } = useToast();

  const handleAddFunds = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;
    try {
      const data = await addFunds(parseFloat(amount));
      
      if (!import.meta.env.VITE_CLIENT_ID) {
        throw new Error("Invalid Stripe key.");
      }
      
      if (import.meta.env.VITE_STRIPE_PUBLIC_SECRET_KEY) {
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLIC_SECRET_KEY
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
      } else {
        addToast("info", "Payment Method Not Available Now");
      }
    } catch (error:any) {
      console.error("Error adding funds:", error);
    }
  };

  const handleWithdraw = async () => {
    if (withdrawAmount && withdrawAmount != null && withdrawUpi) {
      try {
        if (withdrawAmount > 0) {
          const response = await withdrawMoney(withdrawAmount, withdrawUpi);
          console.log(`Withdrawing ₹${withdrawAmount}`);
          console.log(response);
          addToast("success", "Money withdrawal initiated successfully");
          setWithdrawModal(false);
        } else {
          addToast("info", "Withdrawal amount should be greater than zero");
        }
      } catch (error:any) {
        console.error("Error withdrawing funds:", error);
        addToast(
          "danger",
          error.response ? error.response.data.error : error.message
        );
      } finally {
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
      } catch (error:any) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-roboto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl max-sm:text-2xl text-center py-6 font-bold mb-8  border-gray-200">
          WALLET DASHBOARD
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Balance and Actions Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="flex items-center text-xl font-semibold">
                <Wallet className="mr-2 stroke-black" /> Current Balance
              </h2>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-black mb-6">
                ₹{balance.toFixed(2)}
              </p>
              <div className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <div className="grid max-[400px]:grid-cols-1 grid-cols-2 gap-4">
                  <button
                    onClick={handleAddFunds}
                    className="w-full bg-black max-sm:text-sm text-white py-3 rounded-lg flex items-center justify-center font-semibold hover:bg-gray-800 transition"
                  >
                    <ArrowUpRight className="mr-1 max-sm:text-sm" /> Add Funds
                  </button>
                  <button
                    onClick={() => setWithdrawModal(true)}
                    className="w-full max-sm:text-sm border border-black text-black py-3 rounded-lg flex items-center justify-center hover:bg-black/5 transition"
                  >
                    <ArrowDownLeft className="mr-1 max-sm:text-sm" /> Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <p className="text-gray-600 text-sm">Your latest financial activities</p>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 text-gray-600">Type</th>
                    <th className="text-left p-4 text-gray-600">Amount</th>
                    <th className="text-left p-4 text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center text-gray-500 py-8"
                      >
                        No transactions available.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="p-4">
                          {tx.transaction_type === "credit" ? (
                            <span className="text-green-600 flex items-center">
                              <ArrowUpRight className="mr-2" size={16} /> 
                              Credit
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center">
                              <ArrowDownLeft className="mr-2" size={16} /> 
                              Debit
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span
                            className={
                              tx.transaction_type === "credit"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            ₹{tx.amount}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{tx.created_at}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Withdrawal Modal */}
        <Modal
          modalOpen={withdrawModal}
          setModalOpen={() => setWithdrawModal(!withdrawModal)}
        >
          <div className="bg-white text-black p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-200 pb-4">
              Withdraw Money
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Amount:</label>
                <input
                  type="number"
                  value={withdrawAmount != null ? withdrawAmount : ""}
                  min={0}
                  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                  max={balance.toFixed(2)}
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">UPI ID:</label>
                <input
                  type="text"
                  value={withdrawUpi}
                  onChange={(e) => setWithdrawUpi(e.target.value)}
                  className="w-full border border-gray-300 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Enter UPI ID"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  onClick={() => setWithdrawModal(false)}
                  className="border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Confirm Withdraw
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