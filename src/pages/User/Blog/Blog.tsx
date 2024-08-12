import { useEffect, useState } from "react";
import BlogCard from "../../../components/BlogCard/BlogCard";
import PageTitle from "../../../components/PageTitle/PageTitle";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import DrawerBottomToTop from "../../../components/Animation/DrawerBottomToTop";
import CommentSection from "../../../components/Comments/Comments";
import { fetchBlogsUser, updateBlogLike, updateBlogSave } from "../../../services/Blogs";
import type { Blog, BlogResponse, ReadingBlog } from "../../../types";

const Blog: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState<string>("");
  const [readingBlog, setReadingBlog] = useState<ReadingBlog | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<Set<number>>(new Set());

  // Initial fetch
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.VITE_BASE_URL}/blogsession/blogs/users/`;
      try {
        const data: BlogResponse = await fetchBlogsUser(url, search);
        const newBlogs = data.results.filter(blog => !fetchedBlogIds.has(blog.id));
        setFetchedBlogIds(prevIds => new Set([...prevIds, ...newBlogs.map(blog => blog.id)]));
        setBlogs(newBlogs);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  // Fetch more blogs
  const fetchMoreBlogs = async () => {
    if (nextPage) {
      try {
        const data: BlogResponse = await fetchBlogsUser(nextPage, search);
        const newBlogs = data.results.filter(blog => !fetchedBlogIds.has(blog.id));
        setFetchedBlogIds(prevIds => new Set([...prevIds, ...newBlogs.map(blog => blog.id)]));
        setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (error) {
        console.error("Error fetching more data:", error);
      }
    }
  };

  const handleLike = async (blogId: number) => {
    try {
      const result = await updateBlogLike(blogId);
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === blogId
            ? { ...blog, is_liked: result.like, like_count: result.like ? blog.like_count + 1 : blog.like_count - 1 }
            : blog
        )
      );
      if (readingBlog?.id === blogId) {
        setReadingBlog(prevBlog => prevBlog && { ...prevBlog, is_liked: result.like });
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };
  

  const handleSave = async (blogId: number) => {
    try {
      const result = await updateBlogSave(blogId);
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === blogId
            ? { ...blog, is_saved: result.saved, saved_count: result.saved ? blog.saved_count + 1 : blog.saved_count - 1 }
            : blog
        )
      );
      if (readingBlog?.id === blogId) {
        setReadingBlog(prevBlog => prevBlog && { ...prevBlog, is_saved: result.saved });
      }
    } catch (error) {
      console.error("Error saving blog:", error);
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

  const blogData = blogs.map((blog) => ({
    id: blog?.id,
    imageUrl: blog?.image,
    date: new Date(blog?.created_at)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-"),
    title: blog?.title,
    description: blog?.description,
    content: blog?.content,
    likes: blog?.like_count,
    saves: blog?.saved_count,
    is_saved: blog.is_saved,
    is_liked: blog.is_liked,
    author:
      blog?.user?.full_name?.charAt(0).toUpperCase() +
      blog?.user?.full_name?.slice(1),
    authorImage:
      blog?.user?.profile ??
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
  }));

  return (
    <>
      {/* <UserLayout> */}
        <section className="mx-auto pb-10 dark:bg-dark lg:pb-20">
          <PageTitle
            title="BLOGS"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          />
          <div className="px-6 mx-auto w-full sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
            <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 sm:mx-auto lg:max-w-full">
              {blogData.map((blog, index) => (
                <BlogCard
                  calling={() => {
                    setReadingBlog(blog);
                    setDrawerOpen(true);
                  }}
                  key={index}
                  imageUrl={blog.imageUrl}
                  date={blog.date}
                  title={blog.title}
                  author={blog.author}
                  authorImage={blog.authorImage}
                />
              ))}
            </div>
          </div>
          <DrawerBottomToTop
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {/* Title */}
            <h2 className="text-3xl font-bold px-4">{readingBlog?.title}</h2>
            {/* Creator part */}
            <div className="mt-5 w-full px-2 py-1 sticky flex justify-between">
              <div className="flex gap-3">
                <img
                  src={
                    readingBlog?.authorImage ??
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                  }
                  alt="Author Image"
                  className="object-cover w-[50px] max-sm:w-[50px] max-sm:h-[50px] h-[50px] rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="inline-flex items-center font-semibold text-sm">
                    {readingBlog?.author}
                  </p>
                  <p className="inline-flex items-center text-gray-600 text-xs">
                    {readingBlog?.date}
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
                    {formatCount(readingBlog?.likes ?? 0)}
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
                    {formatCount(readingBlog?.saves ?? 0)}
                  </span>
                </p>
              </div>
            </div>
            {/* Image part in blog */}
            <div className="rounded-xl mt-6 h-[500px]">
              <img
                src={readingBlog?.imageUrl}
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
            {readingBlog?.id && (<CommentSection id={readingBlog?.id}/>)}
          </DrawerBottomToTop>
        </section>
        {nextPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={fetchMoreBlogs}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Read More
            </button>
          </div>
        )}
      {/* </UserLayout> */}
    </>
  );
};

export default Blog;