import React, { useEffect, useState } from "react";
import { WithdrawalDataList, updateWithdrawalStatus } from "../../../services/Wallet";
import { useToast } from "../../../components/Toast/ToastManager";

const WithdrawalRequests = () => {
  const [data, setData] = useState([]);
  // const [search, setSearch] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [status, setStatus] = useState<string>("pending");
  const { addToast } = useToast();

  const fetchRequests = async (status: string) => {
    try {
      const response = await WithdrawalDataList(pageNum, status);
      setData(response.results);
      setTotalCount(response.count);

    } catch (error: any) {
      console.error(error);
      addToast("danger", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchRequests(status);
  }, [pageNum, status]);

  const handleNextPage = () => {
    if(Math.ceil(totalCount/8)> totalCount){
      setPageNum((prev) => prev + 1);
    }else{
      addToast('info','no more pages available')
    }
  };

  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPageNum(1);
  };

  const handleAccept = async (id: number) => {
    try {
      await updateWithdrawalStatus(id, "success");
      addToast("success", "Withdrawal request accepted.");
      fetchRequests(status);
    } catch (error: any) {
      console.error(error);
      addToast("danger", error.response ? error.response.data : error.message);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await updateWithdrawalStatus(id, "rejected");
      addToast("success", "Withdrawal request rejected.");
      fetchRequests(status);
    } catch (error: any) {
      console.error(error);
      addToast("danger", error.response ? error.response.data : error.message);
    }
  };

  const columns = [
    { key: "user", label: "User" },
    { key: "amount", label: "Amount" },
    { key: "upi_id", label: "UPI ID" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
    {
      key: "actions",
      label: "Actions",
      render: (item: any) => (
        item.status === "pending" ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleAccept(item.id)}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(item.id)}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className={`px-3 py-1 rounded-md ${item.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        )
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
        <select
          value={status}
          onChange={handleStatusChange}
          className="p-2 border border-gray-300  max-sm:text-xs rounded-md text-gray-700"
        >
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((item: any) => (
                <tr key={item.id} className="bg-white border-b">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-200  max-sm:text-xs rounded-md hover:bg-gray-300 text-gray-700"
          disabled={pageNum === 1}
        >
          Previous
        </button>
        <p className="text-gray-600  max-sm:text-xs">
          Page {pageNum}
        </p>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 max-sm:text-xs bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700"
          disabled={data.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WithdrawalRequests;
