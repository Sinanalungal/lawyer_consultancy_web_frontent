import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CustomInputFullSized from "../../../components/Input/InputFullSize";
import { createSelectedCase, fetchCasesForLawyer, fetchStates } from "../../../services/Case";
import Modal from "../../../components/Modal/Modal"; // Ensure you have a Modal component
import { useToast } from "../../../components/Toast/ToastManager";

const AvailableCases: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const { addToast } = useToast();
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const statesData = await fetchStates();
        setStates(statesData);
        
        const fetchData = async () => {
          const { results, totalPages } = await fetchCasesForLawyer(currentPage, searchTerm, selectedState, status);
          setCases(results);
          console.log(results);
          
          setTotalPages(totalPages);
        };
        fetchData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, [currentPage, searchTerm, selectedState, status]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewDetails = (caseItem: any) => {
    setCaseDetails(caseItem);
    setIsModalOpen(true);
  };

  const handleAttendCase = async () => {
    if (selectedCaseId) {
      try {
        const selectedCaseData = { case_model: selectedCaseId };
        await createSelectedCase(selectedCaseData);
        addToast('success',"Case attended successfully!");
        setIsModalOpen(false); // Close the modal after successful submission
      } catch (error:any) {
        console.error("Error attending case:",  error.response?.data.detail as string || error.message as string);
        addToast('danger',error.response?.data.detail as string || error.message as string);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 lg:px-12 lg:py-8">
      <PageTitle
        title="Case Management"
        description="Manage and review cases assigned to you."
      />

      <section className="mb-8">
        <motion.div
          className="bg-white text-xs p-6 rounded-lg shadow-md border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 grid-cols-1 sm:grid-cols-2 grid lg:grid-cols-3 gap-2 items-center">
            <CustomInputFullSized
              label="Search by Case Name"
              inputType="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter case name..."
            />

            <div className="text-xs">
              <label htmlFor="state" className="block text-gray-700 mb-1">Filter by State</label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="block w-full mb-2 py-4 px-4 border text-xs truncate rounded-lg shadow-sm"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs">
              <label htmlFor="status" className="block text-gray-700 mb-1">Filter by Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full py-4 mb-2 px-4 border text-xs truncate rounded-lg shadow-sm"
              >
                <option value="">All Statuses</option>
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md border overflow-x-scroll border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border table-auto border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b-2 text-sm">
                <th className="py-3 px-4 text-center text-gray-600 font-medium">Case Type</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium">Status</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium">Reference Until</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium">State</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium">User Mail</th>
                <th className="py-3 px-4 text-center text-gray-600 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {cases.length > 0 ? (
                cases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 text-xs">
                    <td className="py-4 text-center px-4 text-gray-800">{caseItem.case_type}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                          caseItem.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">{caseItem.reference_until}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{caseItem.state_name}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{caseItem.user_email}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          handleViewDetails(caseItem);
                          setSelectedCaseId(caseItem.id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-xs text-center text-gray-600">
                    No cases available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 text-xs rounded-full mx-1 text-white bg-slate-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1 text-xs text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 mx-1 text-white text-xs bg-slate-600 rounded-full disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </motion.div>
      </section>

      <Modal
        modalOpen={isModalOpen}
        setModalOpen={() => setIsModalOpen(false)}
        key="Case Details"
      >
        <div className="p-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Case Type: {caseDetails?.case_type}
          </h3>
          <p className="text-gray-600">
            Description: {caseDetails?.description}
          </p>
          <p className="text-gray-600">Status: {caseDetails?.status}</p>
          <p className="text-gray-600">Reference Until: {caseDetails?.reference_until}</p>
          <p className="text-gray-600">State: {caseDetails?.state_name}</p>
          <p className="text-gray-600">User Mail: {caseDetails?.user_email}</p>

          <button
            onClick={handleAttendCase}
            className="w-full py-2 px-4 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
          >
            Attend Case
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AvailableCases;
