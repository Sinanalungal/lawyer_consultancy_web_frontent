import React, { useEffect, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, updateBlogIsListed } from "../../../services/Blogs";
import { Blog, BlogResponse } from "../../../types";
import ConfirmationModal from "../../../components/Modal/AlertModal";
import SearchForm from "../../../components/Search/Search";
import Pagination from "../../../components/Pagination/Pagination";
import SelectionBox from "../../../components/SelectBox/SelectBox";


interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: any; 
}


const AdminBlog: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [status, setStatus] = useState<string>("Listed");
  const [currentUrl, setCurrentUrl] = useState<string | null>(
    `${process.env.VITE_BASE_URL}/blogsession/blogs/`
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (currentUrl) {
      try {
        const data: BlogResponse = await fetchBlogs(currentUrl, search, status);
        setBlogs(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentUrl, search, status]);

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
          selectedBlog?.status == "Pending"
            ? "Listed"
            : selectedBlog?.status == "Listed"
            ? "Blocked"
            : "Listed"
        );
        fetchData();
        // setBlogs((prevBlogs) =>
        //   prevBlogs.map((blog) =>
        //     blog.id === selectedBlog.id
        //       ? { ...blog, status: updatedBlog.status }
        //       : blog
        //   )
        // );
      } catch (error) {
        console.error("Failed to update blog:", error);
      } finally {
        setIsModalOpen(false);
        setSelectedBlog(null);
      }
    }
  };
  const options = [
    { label: "Listed", action: () => setStatus("Listed") },
    { label: "Pending", action: () => setStatus("Pending") },
    { label: "Blocked", action: () => setStatus("Blocked") },
  ];

  const columns:TableColumn[] = [
    { key: "id", label: "ID" },
    { key: "blog", label: "Blog" },
    { key: "user", label: "User Name" },
    { key: "report", label: "Report Count" },
    { key: "published_at", label: "Published At" },
    { key: "status", label: "Status" },
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
    status: blog.status,
    actions: (
      <button
        className={`px-3 py-2 ${
          blog?.status == "Pending"
            ? "bg-green-500"
            : blog?.status == "Listed"
            ? "bg-red-500"
            : "bg-green-500"
        }  text-white`}
        onClick={() => handleToggleIsListed(blog)}
      >
        {blog?.status == "Pending"
          ? "List"
          : blog?.status == "Listed"
          ? "Block"
          : "List"}
      </button>
    ),
  }));
  console.log(selectedBlog?.status);

  return (
    <AdminLayout selected="4">
      <AdminPageTitle
        title="Blogs"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
      />
      {/* <ItemTable
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
      /> */}
      <div className="flex flex-col  h-full pb-16 ">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-end">
          {options && (
            <SelectionBox
              buttonLabel={
                (status == "Listed" && "Listed") ||
                (status == "Pending" && "Pending") ||
                (status == "Blocked" && "Blocked")
              }
              options={options}
            />
          )}
          <SearchForm search={search} setSearch={setSearch} />
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-full inline-block align-middle">
            <div className="border  border-gray-300  min-h-[350px]">
              <table className="min-w-full relative">
                <thead>
                  <tr className="bg-gray-50">
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="p-5 text-left text-xs leading-6 font-semibold text-gray-900 capitalize "
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {data.length > 0 ? (
                    data.map((row:TableRow, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`p-5 whitespace-nowrap text-xs leading-6 font-medium text-gray-900`}
                      >
                        {columns.map((column) => (
                          <td key={column.key} className="px-4 py-4">
                            {row[column.key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <div className=" w-full absolute flex justify-center items-center min-h-[250px]   text-gray-500 text-xs">
                      no data available
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          nextButton={handleNextPage}
          previousButton={handlePreviousPage}
          pageNum={pageNum}
          totalPages={totalCount}
        />
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title={
          selectedBlog?.status == "Pending"
            ? "List Blog"
            : selectedBlog?.status == "Listed"
            ? "Block Blog"
            : "List Blog"
        }
        description={`Are you sure you want to ${
          selectedBlog?.status == "Pending"
            ? "list"
            : selectedBlog?.status == "Listed"
            ? "block"
            : "list"
        } this blog?`}
        onConfirm={confirmToggleIsListed}
        onCancel={() => setIsModalOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminBlog;
