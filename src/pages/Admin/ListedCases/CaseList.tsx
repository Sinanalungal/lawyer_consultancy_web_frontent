import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { getAllCases } from "../../../services/Case";
import Modal from "../../../components/Modal/Modal";

interface Department {
  department_name: string;
}

interface Language {
  name: string;
}

interface User {
  id: number;
  full_name: string;
  profile_image: string | null;
}

interface SelectedCase {
  case_model: {
    id: number;
    case_type: string;
    budget: number;
    description: string;
    reference_until: string;
    state: number;
    state_name: string;
    status: string;
    user_email: string;
    user_phone: string;
  };
  lawyer: {
    id: number;
    user: User;
    address: string;
    city: string;

    state: string;
    postal_code: string;
    experience: number;
    description: string;
    departments: Department[];
    languages: Language[];
  };
}

export interface CaseItem {
  id: number;
  selected_case: SelectedCase;
  created_at: string;
  status: string;
}

const CaseList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<string>("Ongoing");
  const [viewDetailsModal, setViewDetailsModal] = useState<boolean>(false);
  const [caseData, setCaseData] = useState<CaseItem | null>(null);

  useEffect(() => {
    setPageNum(1);
  }, [status]);

  const fetchCases = async () => {
    try {
      const data = await getAllCases(pageNum, search, status);
      setCases(data.results);
      console.log(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [pageNum, search, status]);

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  const columns = [
    { key: "id", label: "Case ID" },
    { key: "case_name", label: "Case Name" },
    { key: "status", label: "Status" },
    { key: "lawyer_name", label: "Lawyer" },
    { key: "userInfo", label: "User Mail" },
    { key: "view_details", label: "View Details" },
    { key: "date_created", label: "Date Created" },
  ];

  const data = cases.map((caseItem) => ({
    id: caseItem.id,
    case_name: caseItem.selected_case.case_model.case_type,
    status: caseItem.status,
    lawyer_name: caseItem.selected_case.lawyer.user.full_name,
    userInfo: caseItem.selected_case.case_model.user_email,
    date_created: new Date(caseItem.created_at).toLocaleDateString(),
    view_details: (
      <div
        onClick={() => {
          setViewDetailsModal(true);
          setCaseData(caseItem);
        }}
        className="text-blue-800"
      >
        view details
      </div>
    ),
  }));

  const statusOptions = [
    { label: "Ongoing", action: () => setStatus("Ongoing") },
    { label: "Completed", action: () => setStatus("Completed") },
  ];

  return (
    <>
    
      <AdminPageTitle
        title="All Cases"
        description="View and manage all allotted cases."
      />
      <ItemTable
        columns={columns}
        data={data}
        itemsPerPage={10}
        search={search}
        setSearch={setSearch}
        nextButton={handleNextPage}
        previousButton={handlePreviousPage}
        pageNum={pageNum}
        total={totalPages}
        blocked={status === "Completed"}
        setBlocked={(blocked) => setStatus(blocked ? "Completed" : "Ongoing")}
        options={statusOptions}
      />
      <Modal
        modalOpen={viewDetailsModal}
        setModalOpen={() => setViewDetailsModal(false)}
      >
        {caseData && (
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Case Type: {caseData.selected_case.case_model.case_type}
            </h3>
            <p className="text-gray-600">
              Description: {caseData.selected_case.case_model.description}
            </p>
            <p className="text-gray-600">
              Budget: ₹{caseData.selected_case.case_model.budget}
            </p>
            <p className="text-gray-600">Status: {caseData.status}</p>
            <h4 className="text-lg font-semibold text-gray-800 mt-4">
              Lawyer Details:
            </h4>
            <p className="text-gray-600">
              Name: {caseData.selected_case.lawyer.user.full_name}
            </p>
            <p className="text-gray-600">
              Experience: {caseData.selected_case.lawyer.experience} years
            </p>
            <h4 className="text-lg font-semibold text-gray-800 mt-4">
              User Details:
            </h4>
            <p className="text-gray-600">
              User Email: {caseData.selected_case.case_model.user_email}
            </p>
            <p className="text-gray-600">
              User Phone: {caseData.selected_case.case_model.user_phone}{" "}
            </p>
            <p className="text-gray-600">
              State Name: {caseData.selected_case.case_model.state_name}{" "}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CaseList;
