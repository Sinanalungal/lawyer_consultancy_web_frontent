import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { CaseFinishedApi, getUserAllotedCases } from "../../../services/Case";
import PageTitle from "../../../components/PageTitle/PageTitle";
import SearchForm from "../../../components/Search/Search";
import ConfirmationModal from "../../../components/Modal/AlertModal";

interface CaseModel {
  case_type: string;
  description: string;
  user_email: string;
  user_phone: string;
  budget: number;
}

interface SelectedCase {
  case_model: CaseModel;
}

interface CaseItem {
  id: number;
  status: string;
  created_at: string;
  selected_case: SelectedCase;
}

interface CaseCardProps {
  caseItem: CaseItem;
  handleCaseFinished: (id: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, handleCaseFinished }) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4 max-[400px]:grid">
        <h3 className="text-lg font-semibold max-[400px]:text-base text-gray-800">
          {caseItem.selected_case.case_model.case_type.toUpperCase()}
        </h3>
        <div className="flex items-center gap-2 max-[400px]:grid">
          <span
            className={`${
              caseItem.status === "Ongoing"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            } text-xs px-3 py-1 text-center rounded-full font-medium`}
          >
            {caseItem.status}
          </span>
          <button
            onClick={() => handleCaseFinished(caseItem.id)}
            className="bg-slate-800 text-white rounded-full px-3 py-1 text-xs hover:bg-slate-700 transition-colors duration-300"
          >
            Mark as Finished
          </button>
        </div>
      </div>

      <div className="space-y-2 ">
        <p
          className={`text-sm max-[400px]:text-xs text-gray-600 cursor-pointer ${
            !showFull && "line-clamp-2"
          }`}
          onClick={() => setShowFull(!showFull)}
        >
          <span className="font-semibold max-[400px]:text-xs">Description:</span> {caseItem.selected_case.case_model.description}
        </p>
        <p className="text-sm text-gray-600 truncate max-[400px]:text-xs">
          <span className="font-semibold ">User Email:</span> {caseItem.selected_case.case_model.user_email}
        </p>
        <p className="text-sm text-gray-600 truncate max-[400px]:text-xs">
          <span className="font-semibold">User Phone:</span> {caseItem.selected_case.case_model.user_phone}
        </p>
        <p className="text-sm text-gray-600 truncate max-[400px]:text-xs">
          <span className="font-semibold">Budget:</span> ${caseItem.selected_case.case_model.budget}
        </p>
        <p className="text-sm text-gray-600 truncate max-[400px]:text-xs">
          <span className="font-semibold">Applied on:</span> {formatDate(caseItem.created_at)}
        </p>
      </div>
    </motion.div>
  );
};

interface CasesData {
  results: CaseItem[];
  totalPages: number;
}

const LawyerCaseManagement: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string>("Ongoing");
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesData: CasesData = await getUserAllotedCases(currentPage, searchTerm, status);
        setCases(casesData.results);
        setTotalPages(casesData.totalPages);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setCases([]);
      }
    };

    fetchCases();
  }, [currentPage, searchTerm, status]);

  const handleCaseFinished = (caseId: number) => {
    setSelectedCaseId(caseId);
    setShowConfirmationModal(true);
  };

  const confirmFinishCase = async () => {
    if (selectedCaseId !== null) {
      try {
        await CaseFinishedApi(selectedCaseId);
        setCases((prevCases) => prevCases.filter((caseItem) => caseItem.id !== selectedCaseId));
        setShowConfirmationModal(false);
      } catch (error) {
        console.error("Error finishing case:", error);
        setShowConfirmationModal(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <PageTitle
        title="Case Management"
        description="Manage and review cases assigned to you."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <Link
            to="../available-cases"
            className="bg-slate-800 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-slate-700 transition-colors duration-300 flex items-center space-x-2 mb-4 sm:mb-0"
          >
            <Briefcase size={18} />
            <span>Available Cases</span>
          </Link>
          <div className="flex items-center space-x-4 max-[400px]:flex-col-reverse">
            <SearchForm search={searchTerm} setSearch={setSearchTerm} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 max-[400px]:text-xs border border-gray-300 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {cases.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  handleCaseFinished={handleCaseFinished}
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-600 py-12"
            >
              No cases available.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex justify-center items-center mt-8">
          <button
            className="px-4 py-2 text-xs bg-slate-200 rounded-full hover:bg-slate-300 transition-colors duration-300 flex items-center"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            <span className="ml-1 max-[400px]:hidden">Previous</span>
          </button>
          <span className="mx-4 text-xs text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-slate-200 text-xs rounded-full hover:bg-slate-300 transition-colors duration-300 flex items-center"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="mr-1 max-[400px]:hidden">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Finish Case"
        description="Are you sure you want to mark this case as finished? This action cannot be undone."
        onConfirm={confirmFinishCase}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </div>
  );
};

export default LawyerCaseManagement;