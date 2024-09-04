import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { getSchedulesForAdminSide, updateSchedulingStatusAdmin } from "../../../services/ScheduleSession";
import ConfirmationModal from "../../../components/Modal/AlertModal";

interface LawyerProfile {
  user: {
    id: number;
    full_name: string;
    profile_image: string | null;
  };
}

export interface SchedulingItem {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  lawyer_profile: LawyerProfile;
  is_listed?: boolean;
}

const ScheduleList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [schedulings, setSchedulings] = useState<SchedulingItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isListedFilter, setIsListedFilter] = useState<string | null>('true');
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedScheduling, setSelectedScheduling] = useState<SchedulingItem | null>(null);

  useEffect(() => {
    fetchSchedulings();
  }, [pageNum, search, isListedFilter]);

  const options = useMemo(
    () => [
      { label: "Listed", action: () => handleFilterChange("true") },
      { label: "Unlisted", action: () => handleFilterChange("false") },
    ],
    []
  );

  const fetchSchedulings = async () => {
    try {
      const data = await getSchedulesForAdminSide(pageNum, search, isListedFilter);
      setSchedulings(data.results);
      setTotalPages(Math.ceil(data.count / 2));
    } catch (error) {
      console.error("Error fetching schedulings:", error);
    }
  };

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

  const handleToggleIsListed = async (scheduling: SchedulingItem) => {
    try {
      await updateSchedulingStatusAdmin(scheduling.id, !scheduling.is_listed);
      fetchSchedulings();
    } catch (error) {
      console.error("Error updating is_listed status:", error);
    }
  };

  const columns = [
    { key: "id", label: "Scheduling ID" },
    { key: "lawyer_name", label: "Lawyer" },
    { key: "date", label: "Date" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "price", label: "Price" },
    { key: "actions", label: "Actions" },
  ];

  const data = schedulings.map((scheduling) => ({
    id: scheduling.id,
    date: scheduling.date,
    start_time: scheduling.start_time,
    end_time: scheduling.end_time,
    price: scheduling.price,
    lawyer_name: scheduling.lawyer_profile.user.full_name,
    actions: (
      <button
        className="bg-red-700 text-white text-xs p-2"
        onClick={() => {
          setSelectedScheduling(scheduling);
          setIsModalOpen(true);
        }}
      >
        {scheduling.is_listed ? "Set Not Listed" : "Set Listed"}
      </button>
    ),
  }));

  const handleFilterChange = (filter: string | null) => {
    setIsListedFilter(filter);
    setPageNum(1);
  };

  const confirmAction = () => {
    if (selectedScheduling) {
      handleToggleIsListed(selectedScheduling);
      setIsModalOpen(false);
    }
  };

  return (
    <AdminLayout selected="6">
      <AdminPageTitle
        title="All Schedulings"
        description="View and manage all schedulings."
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
        options={options}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Action"
        description={`Are you sure you want to ${
          selectedScheduling?.is_listed ? "unlist" : "list"
        } this scheduling?`}
        onConfirm={confirmAction}
        onCancel={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default ScheduleList;
