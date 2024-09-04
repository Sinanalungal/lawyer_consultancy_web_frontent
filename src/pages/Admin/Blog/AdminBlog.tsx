import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, updateBlogIsListed } from "../../../services/Blogs";
import { Blog, BlogResponse } from "../../../types";
import ConfirmationModal from "../../../components/Modal/AlertModal";

const AdminBlog: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(`${process.env.VITE_BASE_URL}/blogsession/blogs/`);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUrl) {
        try {
          const data: BlogResponse = await fetchBlogs(
            currentUrl,
            search,
            blocked
          );
          setBlogs(data.results);
          setNextPage(data.next);
          setPrevPage(data.previous);
          setTotalCount(data.count);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [currentUrl, search, blocked]);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentUrl(nextPage);
      setPageNum((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (prevPage) {
      setCurrentUrl(prevPage);
      setPageNum((prev) => prev - 1);
    }
  };

  const handleToggleIsListed = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const confirmToggleIsListed = async () => {
    if (selectedBlog) {
      try {
        const updatedBlog = await updateBlogIsListed(
          selectedBlog.id,
          !selectedBlog.is_listed
        );
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === selectedBlog.id
              ? { ...blog, is_listed: updatedBlog.is_listed }
              : blog
          )
        );
      } catch (error) {
        console.error("Failed to update blog:", error);
      } finally {
        setIsModalOpen(false);
        setSelectedBlog(null);
      }
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "blog", label: "Blog" },
    { key: "user", label: "User Name" },
    { key: "report", label: "Report Count" },
    { key: "published_at", label: "Published At" },
    { key: "actions", label: "Actions" },
  ];

  const data = blogs.map((blog) => ({
    id: blog.id,
    blog: (
      <div className="flex items-center gap-2">
        <img src={blog.image} className="w-12 h-12 object-cover" alt="" />
        <p className="truncate">{blog.title}</p>
      </div>
    ),
    user: blog.user.full_name,
    report: blog.report_count ?? 0,
    published_at: new Date(blog.created_at).toLocaleDateString(),
    actions: (
      <button
        className={`px-3 py-2 ${blog.is_listed ? "bg-red-500" : "bg-green-500"} text-white`}
        onClick={() => handleToggleIsListed(blog)}
      >
        {blog.is_listed ? "Block" : "Unblock"}
      </button>
    ),
  }));

  return (
    <AdminLayout selected="4">
      <AdminPageTitle
        title="Blogs"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
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
        title={selectedBlog?.is_listed ? "Block Blog" : "Unblock Blog"}
        description={`Are you sure you want to ${
          selectedBlog?.is_listed ? "block" : "unblock"
        } this blog?`}
        onConfirm={confirmToggleIsListed}
        onCancel={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminBlog;
