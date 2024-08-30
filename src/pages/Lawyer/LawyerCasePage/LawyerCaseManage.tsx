import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { fetchCasesForLawyer } from "../../../services/Case"; // Update with the correct path
import { Link } from "react-router-dom";


interface CaseCardProps {
    caseItem: {
      case_type: string;
      status: string;
      reference_until: string;
    };
  }
  
  const CaseCard: React.FC<CaseCardProps> = ({ caseItem }) => {
    return (
      <div className="bg-white shadow w-full rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{caseItem.case_type}</h3>
        <p className="text-gray-600">Status: {caseItem.status}</p>
        <p className="text-gray-600">Reference Until: {caseItem.reference_until}</p>
      </div>
    );
  };
  


const LawyerCaseManagement: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesData = await fetchCasesForLawyer(currentPage, searchTerm, selectedState, status);
        setCases(casesData.results);
        setTotalPages(casesData.totalPages);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setCases([]);
      }
    };

    fetchCases();
  }, [currentPage, searchTerm, selectedState, status]);

  return (
    <>
      <PageTitle
        title="Case Management"
        description="Manage and review cases assigned to you."
      />
      <div className="w-full -mt-8 flex items-center flex-wrap max-[400px]:justify-center max-[400px]:gap-2 justify-end sm:px-10">
        <Link to={'../available-cases'}><div  className="bg-slate-900 text-white text-[10px] rounded-md font-medium py-3 px-3">Available Cases</div></Link>
      </div>
      <div className="p-6 ">
        {cases.length > 0 ? (
          <div className="grid grid-cols-1   gap-2">
            {cases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No cases available.</p>
        )}
        {/* Pagination Controls */}
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
      </div>
    </>
  );
};

export default LawyerCaseManagement;
