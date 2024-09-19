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
  const [activeTab, setActiveTab] = useState<"appliedCases" | "applyCase">(
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
        const casesData = await getUserAllotedCases(currentPage, searchTerm, status);
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
          <section id="applied-cases" className="mb-12 max-w-5xl mx-auto">
            <div className="sm:px-10 flex items-center justify-end gap-2">
              <SearchForm search={searchTerm} setSearch={setSearchTerm} />

              <select
                className="border border-gray-300 rounded-2xl px-2 text-xs py-3 text-gray-700"
                value={status}
                onChange={(e) => setStatus(e.target.value as "Ongoing" | "Completed")}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <motion.div
              className="bg-white p-6 rounded-lg overflow-x-scroll shadow-md border border-gray-200"
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
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">Lawyer</th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">Details</th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {cases.length > 0 ? (
                    cases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-50 text-xs">
                        <td className="py-4 text-center px-4 text-gray-800">
                          {caseItem.selected_case.case_model.case_type}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                              caseItem.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-900"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600">
                          {caseItem.selected_case.case_model.reference_until}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600">
                          {caseItem.selected_case.lawyer.user.full_name}
                        </td>
                        <td
                          onClick={() => {
                            setSelectedCase(caseItem);
                            setViewDetailsModal(true);
                          }}
                          className="py-4 px-4 text-center text-blue-800 cursor-pointer"
                        >
                          View Details
                        </td>
                        {status=='Ongoing'&&<td className="py-4 px-4 text-center space-x-4">
                          <button
                            onClick={() => openModal(caseItem.id)}
                            className="text-white rounded bg-slate-800 p-2 hover:underline"
                          >
                            Finish
                          </button>
                        </td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-600">
                        No cases available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex justify-end gap-3 text-xs items-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* Modal for Case Details */}
        <Modal modalOpen={viewDetailsModal} setModalOpen={() => setViewDetailsModal(false)}>
          {selectedCase && (
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Case Type: {selectedCase.selected_case.case_model.case_type}
              </h3>
              <p className="text-gray-600">Description: {selectedCase.selected_case.case_model.description}</p>
              <p className="text-gray-600">Budget: ₹{selectedCase.selected_case.case_model.budget}</p>
              <p className="text-gray-600">Status: {selectedCase.status}</p>
              <h4 className="text-lg font-semibold text-gray-800 mt-4">Lawyer Details:</h4>
              <p className="text-gray-600">Name: {selectedCase.selected_case.lawyer.user.full_name}</p>
              <p className="text-gray-600">Experience: {selectedCase.selected_case.lawyer.experience} years</p>
            </div>
          )}
        </Modal>

        {/* Confirmation Modal for Marking Case as Finished */}
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
