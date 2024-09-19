import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUserVerification } from "../../../services/fetchUserData";
import { User, UserResponse } from "../../../types";
import ConfirmationModal from "../../../components/Modal/AlertModal";

const AdminUser: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string | null>(`${process.env.VITE_BASE_URL}/api/filter-user/?page=${pageNum}`);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();


  const fetchData = async () => {
    if (currentPage) {
      try {
        const data: UserResponse = await fetchUsers(
          currentPage,
          search,
          blocked
        );
        setUsers(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleToggleVerification = async () => {
    if (selectedUser) {
      try {
        const updatedUser = await updateUserVerification(selectedUser.pk, !selectedUser.is_verified);
        // setUsers((prevUsers) =>
        //   prevUsers.map((user) =>
        //     user.pk === selectedUser.pk
        //       ? { ...user, is_verified: updatedUser.is_verified }
        //       : user
        //   )
        // );
        fetchData()
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  useEffect(() => {
    

    fetchData();
  }, [pageNum, search, currentPage, blocked]);

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

  const data = users.map((user) => ({
    id: user.pk,
    image: (
      user.profile_image ? (
        <img
          src={user.profile_image}
          alt={user.full_name}
          className="rounded-full w-[50px] h-[50px] object-cover"
        />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          alt="Default Profile"
          className="rounded-full w-[50px] h-[50px] object-cover"
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
        onClick={() => openModal(user)} // Open the modal instead of directly toggling
      >
        {user.is_verified ? "Block" : "Unblock"}
      </button>
    ),
  }));

  return (
    <AdminLayout selected="3">
      <AdminPageTitle
        title="Users"
        description="Manage user verification statuses and view user details."
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
        total={totalCount}
        blocked={blocked}
        setBlocked={setBlocked}
      />
      
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Action"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleToggleVerification}
        description={`Are you sure you want to ${selectedUser?.is_verified ? "block" : "unblock"} ${selectedUser?.full_name}?`}
      />
    </AdminLayout>
  );
};

export default AdminUser;
