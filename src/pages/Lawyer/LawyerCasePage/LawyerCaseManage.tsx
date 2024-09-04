import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import {
  CaseFinishedApi,
  getUserAllotedCases,
} from "../../../services/Case";
import { Link } from "react-router-dom";
import SearchForm from "../../../components/Search/Search";
import ConfirmationModal from "../../../components/Modal/AlertModal";

const CaseCard: React.FC<any> = ({ caseItem, handleCaseFinished }) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 duration-200 ease-in-out">
      <div className="flex justify-between max-sm:flex-col gap-1 items-center mb-2">
        <h3 className="text-md font-semibold truncate text-gray-800">
          {caseItem.selected_case.case_model.case_type.toUpperCase()}
        </h3>

        <div className="flex gap-1">
          <span
            className={`${
              caseItem.status === "Ongoing"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            } text-xs px-3 py-1 rounded-full font-medium`}
          >
            {caseItem.status}
          </span>
          <button
            onClick={() => handleCaseFinished(caseItem.id)}
            className="text-white rounded bg-slate-800 px-2 text-xs hover:underline"
          >
            Finished
          </button>
        </div>
      </div>

      <p
        className={`text-xs text-gray-500 cursor-pointer ${
          !showFull && "truncate"
        }`}
        onClick={() => setShowFull(!showFull)}
      >
        Description: {caseItem.selected_case.case_model.description}
      </p>
      <strong><i><p className="text-xs text-gray-500">
        User Email: {caseItem.selected_case.case_model.user_email}
      </p></i></strong>
      <strong><i><p className="text-xs text-gray-500">
        User Phone: {caseItem.selected_case.case_model.user_phone}
      </p></i></strong>
      <p className="text-xs text-gray-500">
        Budget: {caseItem.selected_case.case_model.budget}
      </p>
      <p className="text-xs text-gray-500 mb-4">
        Applied on: {formatDate(caseItem.created_at)}
      </p>
    </div>
  );
};

const LawyerCaseManagement: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesData = await getUserAllotedCases(currentPage, searchTerm, status);
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
    <>
      <PageTitle
        title="Case Management"
        description="Manage and review cases assigned to you."
      />
      <div className="w-full -mt-8 flex items-center flex-wrap max-[400px]:justify-center max-[400px]:gap-2 justify-end sm:px-10">
        <Link to={"../available-cases"}>
          <div className="bg-slate-900 text-white text-[10px] rounded-md font-medium py-3 px-3">
            Available Cases
          </div>
        </Link>
      </div>
      <div className="sm:px-10 flex items-center justify-end gap-1">
        <SearchForm search={searchTerm} setSearch={setSearchTerm} />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" px-1 py-2 border border-gray-300 text-xs rounded-xl"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="p-6 ">
        {cases.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {cases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} handleCaseFinished={handleCaseFinished} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No cases available.</p>
        )}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title="Are you sure you want to finish this case?"
          description="You won't be able to revert this action."
          // confirmText="Yes, finish it!"
          // cancelText="Cancel"
          onConfirm={confirmFinishCase}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default LawyerCaseManagement;
