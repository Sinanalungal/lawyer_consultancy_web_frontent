import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { Link, useNavigate } from "react-router-dom";
import { User, UserResponse } from "../../../types";
import { fetchLawyer, updateLawyerVerification } from "../../../services/fetchLawyers";

const AdminUser: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [lawyers, setLawyers] = useState<User[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string | null>(`${process.env.VITE_BASE_URL}/api/filter-lawyer/?page=${pageNum}`);
  const navigate = useNavigate();

  const handleToggleVerification = async (userId: number, currentIsVerified: boolean) => {
    try {
      const updatedUser = await updateLawyerVerification(userId, !currentIsVerified);
      setLawyers((prevlawyers) =>
        prevlawyers.map((user) =>
          user.pk === userId
            ? { ...user, is_verified: updatedUser.is_verified }
            : user
        )
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    if (currentPage) {
      try {
        const data: UserResponse = await fetchLawyer(currentPage, search, blocked);
        setLawyers(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  fetchData();
}, [currentPage, search, blocked]); 


  const handleNextPage = () => {
    if (nextPage) {
      setPageNum((prev) => prev + 1);
      setCurrentPage(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (prevPage) {
      setPageNum((prev) => prev - 1);
      setCurrentPage(prevPage);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "image", label: "Image" },
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
    { key: "created_at", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  const data = lawyers.map((user) => ({
    id: user.pk,
    image: (
      user.profile_image ? (
        <img
          src={user.profile_image}
          alt={user.full_name}
          className="rounded-full w-[50px] h-[50px] object-cover"
          // width="50"
          // height="50"
        />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          alt="Default Profile"
          className="rounded-full w-[50px] h-[50px] object-cover"
          // width="50"
          // height="50"
        />
      )
    ),
    full_name: user.full_name,
    email: user.email,
    phone_number: user.phone_number,
    created_at: new Date(user.created_at).toLocaleDateString(),
    actions: (
      <button
        className={`px-3 py-2 ${user.is_verified ? "bg-red-500" : "bg-green-500"} text-white`}
        onClick={() => handleToggleVerification(user.pk, user.is_verified)}
      >
        {user.is_verified ? "Block" : "Unblock"}
      </button>
    ),
  }));

  return (
    <AdminLayout selected="2">
      <AdminPageTitle
        title="Lawyers"
        description="Manage user verification statuses and view Lawyer details."
      />
      <div className="w-full flex justify-end text-white text-xs">
        <Link to={'add-lawyer'}><p
          onClick={() => {}}
          className="bg-slate-800 px-3 py-2 cursor-pointer rounded-sm mb-4"
        >
          Add Lawyer
        </p></Link>
      </div>
      <ItemTable
        columns={columns}
        data={data}
        itemsPerPage={10}
        search={search}
        setSearch={setSearch}
        nextButton={handleNextPage}
        previousButton={handlePreviousPage}
        pageNum={pageNum}
        total={totalCount}
        blocked={blocked}
        setBlocked={setBlocked}
      />
    </AdminLayout>
  );
};

export default AdminUser;
