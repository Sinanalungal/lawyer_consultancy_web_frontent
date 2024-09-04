import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { getAllCases } from "../../../services/Case";



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
    { key: "date_created", label: "Date Created" },
  ];

  const data = cases.map((caseItem) => ({
    id: caseItem.id,
    case_name: caseItem.selected_case.case_model.case_type,
    status: caseItem.status,
    lawyer_name: caseItem.selected_case.lawyer.user.full_name,
    userInfo: caseItem.selected_case.case_model.user_email,
    date_created: new Date(caseItem.created_at).toLocaleDateString(),
  }));

  const statusOptions = [
    { label: "Ongoing", action: () => setStatus("Ongoing") },
    { label: "Completed", action: () => setStatus("Completed") },
  ];

  return (
    <AdminLayout selected="3">
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
    </AdminLayout>
  );
};

export default CaseList;
