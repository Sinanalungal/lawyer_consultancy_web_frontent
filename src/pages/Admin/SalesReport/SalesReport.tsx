import React, { useState, useEffect, useCallback } from "react";
import { format, isValid } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { GetPdfData, GetSalesReport } from "../../../services/SalesReport";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLoader } from "../../../components/GlobelLoader/GlobelLoader";

interface PaymentDetails {
  id: number;
  payment_for: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

interface LawyerProfile {
  user: {
    full_name: string;
    profile_image: string | null;
  };
}

interface Scheduling {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_listed: boolean;
  lawyer_profile: LawyerProfile;
  price: string;
}

interface UserProfile {
  full_name: string;
  profile_image: string | null;
}

interface BookedAppointment {
  id: number;
  booked_at: string;
  is_canceled: boolean;
  is_completed: boolean;
  is_transaction_completed: boolean;
  payment_details: PaymentDetails;
  scheduling: Scheduling;
  user_profile: UserProfile;
  uuid: string;
}

const SalesReportTable: React.FC = () => {
  const [salesData, setSalesData] = useState<BookedAppointment[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const { setLoader } = useLoader();

  useEffect(() => {
    fetchSalesData();
  }, [currentPage, fromDate, toDate, searchTerm]);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const response = await GetSalesReport(
        fromDate,
        toDate,
        searchTerm,
        currentPage,
        itemsPerPage
      );
      setSalesData(response.results);
      setTotalPages(Math.ceil(response.count / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    setLoader(true);
    try {
      const fetchedData = await GetPdfData(
        fromDate,
        toDate,
        searchTerm,
        currentPage,
        itemsPerPage
      );
      if (fetchedData.length > 0) {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Sales Report", 14, 16);

        const tableData = fetchedData.map((row: any) => [
          // row.uuid,
          row.user_profile.full_name,
          row.scheduling.lawyer_profile.user.full_name,
          formattedDate(row.booked_at),
          row.payment_details.transaction_id,
          row.payment_details.payment_method,
          formattedDate(row.payment_details.created_at),
          (Number(row.scheduling.price) * 0.1).toFixed(2),
        ]);

        autoTable(doc, {
          head: [
            [
              "User",
              "Lawyer",
              "Booking Date",
              "Transaction ID",
              "Payment Method",
              "Transaction Time",
              "Payment Amount",
            ],
          ],
          body: tableData,
          startY: 22,
          margin: { top: 22 },
        });

        doc.save("sales_report.pdf");
      } else {
        alert("No sales data found for the given criteria");
      }
    } catch {
      console.error("Failed to fetch PDF data");
    } finally {
      setLoader(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formattedDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd HH:mm:ss") : "Invalid Date";
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <AdminPageTitle
          title="SALES REPORT"
          description="Sales reports listed here..."
        />

        {/* Search and Filters */}
        <div className="flex justify-end max-sm:grid gap-2 text-xs sm:space-x-4 items-end mb-4">
          <div>
            <label htmlFor="from-date" className="block text-xs font-medium">
              From Date
            </label>
            <DatePicker
              id="from-date"
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded p-2"
              placeholderText="Select From Date"
            />
          </div>
          <div>
            <label htmlFor="to-date" className="block text-xs font-medium">
              To Date
            </label>
            <DatePicker
              id="to-date"
              selected={toDate}
              onChange={(date: Date | null) => setToDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded p-2"
              placeholderText="Select To Date"
            />
          </div>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by user..."
            className="border border-gray-300 rounded p-2 w-full text-xs"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto  rounded-lg shadow">
            <table className="min-w-full  table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200 text-xs">
                <tr>
                  {/* <th className="px-4 py-2 text-center border">Session ID</th> */}
                  <th className="px-4 py-2 text-center border">User</th>
                  <th className="px-4 py-2 text-center border">Lawyer</th>
                  <th className="px-4 py-2 text-center border">Booking Date</th>
                  <th className="px-4 py-2 text-center border">
                    Transaction ID
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Payment Method
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Transaction Time
                  </th>
                  <th className="px-4 py-2 text-center border">
                    Payment Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesData?.length > 0 ? (
                  salesData.map((row, index) => (
                    <tr key={index} className="bg-white text-xs">
                      {/* <td className="px-4 py-2 text-center border truncate">
                          {row.uuid}
                        </td> */}
                      <td className="px-4 py-2 text-center border">
                        {row.user_profile.full_name}
                      </td>
                      <td className="px-4 py-2 text-center border truncate">
                        {row.scheduling.lawyer_profile.user.full_name}
                      </td>

                      <td className="px-4 py-2 text-center border truncate">
                        {formattedDate(row.booked_at)}
                      </td>

                      <td className="px-4 py-2 text-center border truncate">
                        {row.payment_details.transaction_id}
                      </td>
                      <td className="px-4 py-2 text-center border truncate">
                        {row.payment_details.payment_method}
                      </td>
                      <td className="px-4 py-2 text-center border truncate">
                        {formattedDate(row.payment_details.created_at)}
                      </td>
                      <td className="px-4 py-2 text-center border">
                        {(Number(row.scheduling.price) * 0.1).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 truncate  text-xs py-2 text-center border"
                    >
                      No sales data available for the selected date range.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end gap-1 text-xs items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SalesReportTable;
