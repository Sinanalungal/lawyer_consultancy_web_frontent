import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { CaseFinishedApi, getUserAllotedCases } from "../../../services/Case";
import SearchForm from "../../../components/Search/Search";
import ConfirmationModal from "../../../components/Modal/AlertModal";
import { useLoader } from "../../../components/GlobelLoader/GlobelLoader";
import Modal from "../../../components/Modal/Modal";

// Define case type
interface Case {
  id: number;
  status: string;
  selected_case: {
    case_model: {
      case_type: string;
      reference_until: string;
      budget: number;
      description: string;
    };
    lawyer: {
      user: {
        full_name: string;
      };
      experience: number;
    };
  };
}

const OngoingCases: React.FC = () => {
  const [activeTab, _setActiveTab] = useState<"appliedCases" | "applyCase">(
    "appliedCases"
  );
  const [cases, setCases] = useState<Case[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [status, setStatus] = useState<"Ongoing" | "Completed">("Ongoing");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    const fetchCases = async () => {
      setLoader(true);
      try {
        const casesData = await getUserAllotedCases(
          currentPage,
          searchTerm,
          status
        );
        setCases(casesData.results);
        setTotalPages(casesData.totalPages);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setCases([]);
      } finally {
        setLoader(false);
      }
    };

    if (activeTab === "appliedCases") {
      fetchCases();
    }
  }, [currentPage, searchTerm, status, activeTab, setLoader]);

  const handleCaseFinished = async () => {
    if (selectedCaseId !== null) {
      try {
        await CaseFinishedApi(selectedCaseId);
        setCases((prevCases) =>
          prevCases.filter((caseItem) => caseItem.id !== selectedCaseId)
        );
      } catch (error) {
        console.error("Error finishing case:", error);
      } finally {
        setModalOpen(false);
      }
    }
  };

  const openModal = (caseId: number) => {
    setSelectedCaseId(caseId);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-[400px] flex-col">
      <main className="flex-1 p-6 lg:px-12 lg:py-8">
        <PageTitle
          title="Case Management"
          description="Manage your applied cases or start a new case application."
        />

        {activeTab === "appliedCases" && (
          <section id="applied-cases" className="mb-12 max-w-6xl mx-auto">
            <div className="sm:px-6 flex items-center justify-between gap-4 mb-2">
              <SearchForm search={searchTerm} setSearch={setSearchTerm} />

              <select
                className="shadow text-xs cursor-pointer border-white rounded-lg px-8 flex py-2 text-gray-700 focus:outline-none focus:ring-0 focus:border-transparent"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Ongoing" | "Completed")
                }
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <th className="px-6 py-3">Case Type</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Reference Until</th>
                      <th className="px-6 py-3">Lawyer</th>
                      <th className="px-6 py-3">Details</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cases.length > 0 ? (
                      cases.map((caseItem) => (
                        <tr
                          key={caseItem.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                            {caseItem.selected_case.case_model.case_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                caseItem.status === "Ongoing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {caseItem.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                            {caseItem.selected_case.case_model.reference_until}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                            {caseItem.selected_case.lawyer.user.full_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs">
                            <button
                              onClick={() => {
                                setSelectedCase(caseItem);
                                setViewDetailsModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                            >
                              View Details
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-[13px]">
                            {status === "Ongoing" && (
                              <button
                                onClick={() => openModal(caseItem.id)}
                                className="text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition-colors duration-200"
                              >
                                Finish
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No cases available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end items-center bg-gray-50 px-6 py-3 border-t border-gray-200">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-xs text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="ml-3 px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* Modal for Case Details */}
        <Modal
          modalOpen={viewDetailsModal}
          setModalOpen={() => setViewDetailsModal(false)}
        >
          {selectedCase && (
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Case Type: {selectedCase.selected_case.case_model.case_type}
              </h3>
              <p className="text-gray-600">
                Description: {selectedCase.selected_case.case_model.description}
              </p>
              <p className="text-gray-600">
                Budget: ₹{selectedCase.selected_case.case_model.budget}
              </p>
              <p className="text-gray-600">Status: {selectedCase.status}</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">
                Lawyer Details:
              </h4>
              <p className="text-gray-600">
                Name: {selectedCase.selected_case.lawyer.user.full_name}
              </p>
              <p className="text-gray-600">
                Experience: {selectedCase.selected_case.lawyer.experience} years
              </p>
            </div>
          )}
        </Modal>

        <ConfirmationModal
          isOpen={modalOpen}
          title="Mark Case as Finished?"
          description="Do you really want to mark this case as finished?"
          onConfirm={handleCaseFinished}
          onCancel={() => setModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default OngoingCases;
