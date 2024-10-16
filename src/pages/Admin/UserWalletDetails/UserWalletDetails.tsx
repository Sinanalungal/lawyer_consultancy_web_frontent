import React, { useState, useEffect } from "react";
import { SearchIcon, RefreshCwIcon } from "lucide-react";
import {
  WalletDetailsOfAllUsers,
  WalletTransactionHistoryApi,
} from "../../../services/Wallet";

// Define types for user and transaction
interface Transaction {
  id: number;
  amount: number;
  transaction_type: "credit" | "debit";
  created_at: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
  wallet_balance: number;
}

// UserWalletDetails component
const UserWalletDetails: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userPage, setUserPage] = useState<number>(1);
  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<{
    count: number;
    results: Transaction[];
  }>({ count: 0, results: [] });

  const fetchUsers = async (page: number, search: string = "") => {
    try {
      const data = await WalletDetailsOfAllUsers(page, search);
      setUsers(data.results);
      setTotalUsers(data.count);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTransactionHistory = async (userId: number, page: number) => {
    try {
      const data = await WalletTransactionHistoryApi(userId, page);
      setTransactionHistory(data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    fetchTransactionHistory(user.id, transactionPage);
  };

  const handleUserPageChange = (page: number) => {
    setUserPage(page);
    fetchUsers(page, searchTerm);
  };

  const handleTransactionPageChange = (page: number) => {
    setTransactionPage(page);
    if (selectedUser) {
      fetchTransactionHistory(selectedUser.id, page);
    }
  };

  useEffect(() => {
    fetchUsers(userPage, searchTerm);
  }, [userPage, searchTerm]);

  return (
    <div className="min-h-screen max-[400px]:p-3 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">
          Admin Wallet Dashboard
        </h1>

        <div className="mb-6 flex items-center bg-white rounded-lg shadow-md p-2">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-3 focus:outline-none text-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-indigo-900">
              <h2 className="text-xl font-semibold text-white">
                User Balances
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-indigo-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {user.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                        ₹ {user.wallet_balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                        <button
                          onClick={() => handleUserSelect(user)}
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                        >
                          View History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center text-xs gap-2 items-center p-4">
                {userPage > 1 && (
                  <button
                    onClick={() => handleUserPageChange(userPage - 1)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Previous
                  </button>
                )}
                <p className="bg-gray-200 py-2 px-3 text-black text-[11px] rounded-full">
                  {userPage}
                </p>
                {userPage < Math.ceil(totalUsers / 8) && (
                  <button
                    onClick={() => handleUserPageChange(userPage + 1)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>

          {selectedUser ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-indigo-900 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  {selectedUser.full_name}'s Transactions
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-white hover:text-indigo-200"
                >
                  <RefreshCwIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-100">
                    {transactionHistory.results.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-indigo-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                          {new Date(transaction.created_at).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 capitalize">
                          {transaction.transaction_type}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-xs font-medium ${
                            transaction.transaction_type == "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-2 justify-center text-xs items-center p-4">
                  {transactionPage > 1 && (
                    <button
                      onClick={() =>
                        handleTransactionPageChange(transactionPage - 1)
                      }
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Previous
                    </button>
                  )}
                  <p className="bg-gray-200 py-2 px-3 text-black text-[11px] rounded-full">
                  {transactionPage}
                </p>
                  {transactionPage <
                    Math.ceil(transactionHistory.count / 8) && (
                    <button
                      onClick={() =>
                        handleTransactionPageChange(transactionPage + 1)
                      }
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg text-xs p-6 flex items-center justify-center h-full">
              <p className="text-gray-600">
                Select a user to view their transaction history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWalletDetails;
