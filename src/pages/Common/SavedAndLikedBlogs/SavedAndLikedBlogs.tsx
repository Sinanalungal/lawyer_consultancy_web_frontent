import React, { useState, useEffect } from "react";
import BlogCard from "../../../components/BlogCard/BlogCard";
import PageTitle from "../../../components/PageTitle/PageTitle";
import DrawerBottomToTop from "../../../components/Animation/DrawerBottomToTop";
import {
  getUserLikedBlogs,
  getUserSavedBlogs,
  reportBlog,
  updateBlogLike,
  updateBlogSave,
} from "../../../services/Blogs";
import { Blog } from "../../../types";
import ConfirmationModal from "../../../components/Modal/AlertModal";
import Modal from "../../../components/Modal/Modal";
import CommentSection from "../../../components/Comments/Comments";
import { useToast } from "../../../components/Toast/ToastManager";
import { BeatLoader } from "react-spinners";

interface BlogSavedOrLiked {
  blog: Blog;
  saved: boolean;
  updated_at: string;
}

const SavedAndLikedBlogs: React.FC = () => {
  const [blogsData, setBlogs] = useState<BlogSavedOrLiked[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [tab, setTab] = useState<"saved" | "liked">("saved");
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [readingBlog, setReadingBlog] = useState<Blog | null>(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(
    false
  );
  const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportNote, setReportNote] = useState<string>("");
  const { addToast } = useToast();

  useEffect(() => {
    fetchBlogs(page);
  }, [page, tab]);

  const fetchBlogs = async (page: number) => {
    setIsLoading(true);
    setError("");
    try {
      const response =
        tab === "saved"
          ? await getUserSavedBlogs(page)
          : await getUserLikedBlogs(page);
      console.log(response.results);

      setBlogs(response.results);
      console.log(response, "this is the response");
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      setError("Error fetching blogs.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleReport = async () => {
    if (readingBlog && readingBlog.id !== null && reportNote.trim()) {
      try {
        await reportBlog(readingBlog.id, reportNote);
        fetchBlogs(page);
        addToast("success", "Blog reported successfully.");
      } catch (error:any) {
        console.error("Error reporting blog:", error);
        addToast("danger", error.response.data as string);
      } finally {
        setReportNote("");
        setReportModalOpen(false);
      }
    } else {
      console.log("Please provide a note to report.");
    }
  };
  function formatCount(count: number): string {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    return count.toString();
  }
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
  };

  const handleSave = async (blogId: number) => {
    try {
      const result = await updateBlogSave(blogId);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.blog.id === blogId
            ? {
                ...blog,
                is_saved: result.saved,
                saved_count: result.saved
                  ? blog.blog.saved_count + 1
                  : blog.blog.saved_count - 1,
              }
            : blog
        )
      );
      if (readingBlog?.id === blogId) {
        setReadingBlog(
          (prevBlog) => prevBlog && { ...prevBlog, is_saved: result.saved }
        );
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };
  const handleLike = async (blogId: number) => {
    try {
      const result = await updateBlogLike(blogId);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.blog.id === blogId
            ? {
                ...blog,
                is_liked: result.like,
                like_count: result.like
                  ? blog.blog.like_count + 1
                  : blog.blog.like_count - 1,
              }
            : blog
        )
      );
      if (readingBlog?.id === blogId) {
        setReadingBlog(
          (prevBlog) => prevBlog && { ...prevBlog, is_liked: result.like }
        );
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div className="mx-auto  pb-10 dark:bg-dark lg:pb-20">
      <PageTitle
        title={tab === "saved" ? "Saved Blogs" : "Liked Blogs"}
        description="Your collection of blogs you've saved or liked."
      />
      <div className="mb-8 flex justify-center">
        <nav className="flex space-x-2 border rounded-full p-1 bg-white">
          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
              tab === "saved" ? "bg-slate-800 text-white" : "text-gray-600"
            }`}
          >
            saved
          </button>
          <button
            onClick={() => setTab("liked")}
            className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
              tab === "liked" ? "bg-slate-800 text-white" : "text-gray-600"
            }`}
          >
            Liked
          </button>
        </nav>
      </div>
      {isLoading ? (
        // <p>Loading...</p>
        <div style={spinnerStyle}>
          <BeatLoader color="#312e81" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : blogsData.length === 0 ? (
        <p className="w-full h-[300px] flex justify-center items-center">
          No blogs found.
        </p>
      ) : (
        <div className="px-10 py-4  grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 sm:mx-auto lg:max-w-full">
          {blogsData.map((blog, index) => {
            console.log(blog, "this si the lbog");
            return (
              <BlogCard
                key={index}
                imageUrl={`${blog.blog.image}`}
                date={formatDate(blog.blog.created_at)}
                title={blog.blog.title}
                author={blog.blog.user.full_name}
                authorImage={
                  blog.blog.user.profile
                    ? blog.blog.user.profile
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                }
                calling={() => {
                  setReadingBlog(blog.blog);
                  setDrawerOpen(true);
                }}
              />
            );
          })}
        </div>
      )}
      {blogsData.length > 0 && page != totalPages && (
        <div className="flex items-center text-[10px] justify-center my-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`bg-slate-700 text-white py-2 px-4 rounded-full mx-2 transition duration-300 ease-in-out 
                            ${
                              page === 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-slate-800"
                            }`}
          >
            Previous
          </button>
          <span className="text-[10px]">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`bg-slate-700 text-white py-2 px-4 rounded-full mx-2 transition duration-300 ease-in-out 
                            ${
                              page === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-slate-800"
                            }`}
          >
            Next
          </button>
        </div>
      )}

      <DrawerBottomToTop
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <h2 className="text-3xl font-bold px-4">{readingBlog?.title}</h2>
        <div className="mt-5 w-full px-2 py-1 sticky flex justify-between">
          <div className="flex gap-3">
            <img
              src={
                readingBlog?.user.profile ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              }
              alt="Author Image"
              className="object-cover w-[50px] max-sm:w-[50px] max-sm:h-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="inline-flex items-center font-semibold text-sm">
                {readingBlog?.user.full_name}
              </p>
              <p className="inline-flex items-center text-gray-600 text-xs">
                {readingBlog?.created_at}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p
              onClick={() => readingBlog?.id && handleLike(readingBlog.id)}
              className={`relative p-2 border rounded-full border-gray-400 inline-flex items-center ${
                readingBlog?.is_liked ? "bg-black" : "bg-white"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-4 ${
                  readingBlog?.is_liked ? "text-white" : "text-black"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-white text-gray-800 shadow-sm">
                {formatCount(readingBlog?.like_count ?? 0)}
              </span>
            </p>
            <p
              onClick={() => readingBlog?.id && handleSave(readingBlog.id)}
              className={`relative p-2 border rounded-full border-gray-400 inline-flex items-center ${
                readingBlog?.is_saved ? "bg-black" : "bg-white"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-4 ${
                  readingBlog?.is_saved ? "text-white" : "text-black"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-white text-gray-800 shadow-sm">
                {formatCount(readingBlog?.saved_count ?? 0)}
              </span>
            </p>
            <p
              onClick={() =>
                readingBlog?.id && setReportModalOpen(!isReportModalOpen)
              }
              className={`relative p-2 border rounded-full border-gray-400 inline-flex items-center ${
                readingBlog?.is_reported ? "bg-black" : "bg-white"
              } cursor-pointer`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-4 ${
                  readingBlog?.is_reported ? "text-white" : "text-black"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </p>
          </div>
        </div>
        <div className="rounded-xl mt-6 h-[500px]">
          <img
            src={`${readingBlog?.image}`}
            alt="Blog Image"
            className="h-[500px] object-cover w-full rounded-xl"
          />
        </div>
        <div className="max-sm:px-2 p-7 xl:text-base sm:text-sm text-xs">
          <blockquote className="text-xl max-[400px]:text-base italic font-semibold text-gray-900 dark:text-white">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p className="break-words">{readingBlog?.description}</p>
          </blockquote>
        </div>

        {readingBlog?.content && (
          <div
            className="px-1 xl:text-base sm:text-sm text-xs"
            dangerouslySetInnerHTML={{ __html: readingBlog?.content }}
          ></div>
        )}
        {readingBlog?.id && <CommentSection id={readingBlog?.id} />}
        <Modal
          modalOpen={isReportModalOpen}
          setModalOpen={() => setReportModalOpen(false)}
          children={
            <>
              <h2 className="text-xl font-bold">Report Blog</h2>
              <textarea
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Enter your note..."
                rows={4}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setConfirmationModalOpen(true);
                    setReportModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Report
                </button>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </>
          }
        ></Modal>
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          description="Are you sure to report this blog"
          onCancel={() => {
            setConfirmationModalOpen(false);
            setReportModalOpen(true);
          }}
          onConfirm={() => {
            handleReport();
            setConfirmationModalOpen(false);
          }}
          title="Report Blog"
        ></ConfirmationModal>
      </DrawerBottomToTop>
    </div>
  );
};

export default SavedAndLikedBlogs;
