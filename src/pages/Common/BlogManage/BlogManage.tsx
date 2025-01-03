import { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import { BlogDeleting, fetchPersonalBlogs } from "../../../services/Blogs";
import { useNavigate } from "react-router-dom";
import { Blog, BlogResponse } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginState } from "../../../redux/slice/LoginActions";
import { useToast } from "../../../components/Toast/ToastManager";
import Pagination from "../../../components/Pagination/Pagination";
import SearchForm from "../../../components/Search/Search";
import SelectionBox from "../../../components/SelectBox/SelectBox";
import { DatabaseBackup } from "lucide-react";

interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: any;
}

const BlogManage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [status, setStatus] = useState<string>("Listed");
  const [currentUrl, setCurrentUrl] = useState<string | null>(
    `${import.meta.env.VITE_BASE_URL}/blogsession/personal-blogs/`
  );
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { role } = useSelector((state: RootState) => state.login as LoginState);
  console.log(role);

  const fetchData = async () => {
    if (currentUrl) {
      try {
        const data: BlogResponse = await fetchPersonalBlogs(
          currentUrl,
          search,
          status
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

  const handleBlogDeletion = async (blog_id: number) => {
    try {
      const response = await BlogDeleting(blog_id);
      console.log(response);
      addToast("success", "Blog deleted successfully");
      fetchData();
    } catch (error) {
      addToast("danger", "something went wrong");
    }
  };

  const columns: TableColumn[] = [
    { key: "id", label: "ID" },
    { key: "blog", label: "Blog" },
    // { key: "user", label: "User Name" },
    { key: "report", label: "Report Count" },
    { key: "status", label: "Status" },
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
    // user: blog.user.full_name,
    report: blog.report_count ?? 0,
    published_at: new Date(blog.created_at).toLocaleDateString(),
    status: blog.status,
    actions: (
      <div className="gap-1 flex">
        <button
          className={`px-3  py-2 bg-slate-700 text-white`}
          onClick={() => {
            role == "admin"
              ? navigate(
                  `../../../../../../admin/blog/add-blog/?blog=${blog.id}`
                )
              : navigate(
                  `../../../../../../lawyer/blog/add-blog/?blog=${blog.id}`
                );
          }}
        >
          Edit
        </button>
        <button
          className={`px-3  py-2 bg-red-500 text-white`}
          onClick={() => handleBlogDeletion(blog.id)}
        >
          Delete
        </button>
      </div>
    ),
  }));

  const options = [
    { label: "Listed", action: () => setStatus("Listed") },
    { label: "Pending", action: () => setStatus("Pending") },
    { label: "Blocked", action: () => setStatus("Blocked") },
  ];

  return (
    <>
      <AdminPageTitle
        title="Your Blogs"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,"
      />
      <div className="w-full flex justify-end text-white text-xs">
        <p
          onClick={() =>
            navigate(
              role == "lawyer"
                ? "../../../../../lawyer/blog/add-blog"
                : "../../../../../admin/blog/add-blog"
            )
          }
          className="bg-slate-800 px-3 py-2 cursor-pointer rounded-sm mb-4"
        >
          Add Blog
        </p>
      </div>

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
            <div className="border  border-gray-300  h-auto">
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
                    data.map((row: TableRow, rowIndex) => (
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
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-16 whitespace-nowrap text-sm text-gray-500 text-center"
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <DatabaseBackup className="h-12 w-12 text-gray-400" />
                          <p>No data available</p>
                        </div>
                      </td>
                    </tr>
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
    </>
  );
};

export default BlogManage;
