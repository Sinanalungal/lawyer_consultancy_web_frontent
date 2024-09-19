import { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ItemTable from "../../../components/Table/ItemTable";
import { BlogDeleting, fetchBlogs, updateBlogIsListed } from "../../../services/Blogs";
import { useNavigate } from "react-router-dom";
import { Blog, BlogResponse } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginState } from "../../../redux/slice/LoginActions";
import { useToast } from "../../../components/Toast/ToastManager";


const BlogManage: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [pageNum, setPageNum] = useState<number>(1);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [currentUrl,setCurrentUrl]=useState<string|null>(`${process.env.VITE_BASE_URL}/blogsession/blogs/`);
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { role } = useSelector((state: RootState) => state.login as LoginState)
console.log(role);

  
  const fetchData = async () => {
    if(currentUrl){
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
    useEffect(() => {
  
      fetchData();
    }, [currentUrl, search, blocked]);
  
    const handleNextPage = () => {
      if (nextPage) {
        setCurrentUrl(nextPage)
        setPageNum((prev) => prev + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (prevPage) {
        setCurrentUrl(prevPage)
        setPageNum((prev) => prev - 1);
      }
    };

    const handleBlogDeletion = async (blog_id: number) => {
      try{
        const response = await BlogDeleting(blog_id)
        console.log(response)
        addToast('success','Blog deleted successfully')
        fetchData()
      }catch (error) {
        addToast('danger','something went wrong')
      }
    }
  
    // const handleToggleIsListed = async (
    //   blogId: number,
    //   currentIsListed: boolean
    // ) => {
    //   try {
    //     const updatedBlog = await updateBlogIsListed(blogId, !currentIsListed);
    //     setBlogs((prevBlogs) =>
    //       prevBlogs.map((blog) =>
    //         blog.id === blogId
    //           ? { ...blog, is_listed: updatedBlog.is_listed }
    //           : blog
    //       )
    //     );
    //   } catch (error) {
    //     console.error("Failed to update blog:", error);
    //   }
    // };
  
    const columns = [
      { key: "id", label: "ID" },
      { key: "blog", label: "Blog" },
      // { key: "user", label: "User Name" },
      { key: "report", label: "Report Count" },
      {key:'blocked',label: "Blocked" },
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
      blocked:blog.is_listed?"Not Blocked": "Blocked",
      actions: (
        <div className="gap-1 flex">
         <button
          className={`px-3  py-2 bg-slate-700 text-white`}
          onClick={() =>{role =='admin'? navigate(`../../../../../../admin/blog/add-blog/?blog=${blog.id}`):navigate(`../../../../../../lawyer/blog/add-blog/?blog=${blog.id}`)}}
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
  
  

  return (
    <>
    <AdminPageTitle
        title="Your Blogs"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,"
      />
      <div className="w-full flex justify-end text-white text-xs">
        <p
          onClick={() => navigate(role=='lawyer'?"../../../../../lawyer/blog/add-blog":"../../../../../admin/blog/add-blog")}
          className="bg-slate-800 px-3 py-2 cursor-pointer rounded-sm mb-4"
        >
          Add Blog
        </p>
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
        options={[{ label: 'Listed', action: () => setBlocked?.(true) },{ label: 'Unlisted', action: () => setBlocked?.(false) }]

      }
      />
    </>
  );
};

export default BlogManage;


