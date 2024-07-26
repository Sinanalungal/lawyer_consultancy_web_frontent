import { useState } from "react";
import BlogCard from "../../../components/BlogCard/BlogCard";
import PageTitle from "../../../components/PageTitle/PageTitle";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import DrawerBottomToTop from "../../../components/Animation/DrawerBottomToTop";
import CommentSection from "../../../components/Comments/Comments";

const Blog = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const description ='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)';
  const mainContent = `
  <main class="post-content">
    <h2>Blog Post Title</h2>
    <p>Published on: <em>July 20, 2024</em></p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Proin ac tortor nec libero bibendum sagittis. Mauris sollicitudin lorem in eros dapibus, id elementum justo tincidunt. Vivamus hendrerit lectus eu nisi tristique, ac posuere orci pharetra.</p>
    <p>Praesent auctor nisi id sapien fermentum, non vestibulum purus dictum. Sed et ipsum sed ipsum scelerisque volutpat. Duis sit amet nulla vel nunc tristique luctus. Ut a sapien velit. Nullam sed feugiat eros, sit amet luctus magna. Etiam scelerisque enim nec dolor sodales, id cursus felis efficitur.</p>
    <p>Donec euismod libero sed convallis feugiat. Curabitur a arcu tortor. Aenean congue arcu nec nisi ultrices, ac dictum arcu cursus. Sed eget elit vitae ipsum faucibus aliquam. Donec venenatis pulvinar sem, et hendrerit dolor consectetur et.</p>
    <p>Integer ut arcu sed leo tempor tincidunt. Aliquam erat volutpat. Fusce nec ex id justo vehicula ullamcorper. Ut id magna a erat faucibus pellentesque sit amet vel massa. Vivamus consequat magna nec sapien vehicula, non dictum libero viverra.</p>
  </main>
`;
  const blogData = [
    {
      imageUrl:
        "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      date: "13 Jul 2020",
      title: "Diving to the deep",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      date: "4 Nov 2020",
      title: "Conquer the World",
      description:
        "Sed ut perspiciatis  unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      date: "28 Dec 2020",
      title: "Explore the beautiful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      date: "13 Jul 2020",
      title:
        "Diving to the deep for the new day of tommorrow for the recognition of the",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      date: "4 Nov 2020",
      title: "Conquer the World",
      description:
        "Sed ut perspiciatis  unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      date: "28 Dec 2020",
      title: "Explore the beautiful",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.",
      likes: 7400,
      author: "Lindsay Walton",
      comments: 81,
    },
  ];
  return (
    <>
      <UserLayout>
        {/* <BlogResources title='Blogs' subtitle='All blogs are listed here'/> */}
        <section className="  mx-auto pb-10 dark:bg-dark lg:pb-20">
          <PageTitle
            title="BLOGS"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          />
          <div className="px-6 mx-auto  w-full  sm:max-w-xl md:max-w-full  md:px-24 lg:px-8 ">
            <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3  sm:grid-cols-2  sm:mx-auto lg:max-w-full">
              {blogData.map((blog, index) => (
                <BlogCard
                  calling={() => setDrawerOpen(true)}
                  key={index}
                  imageUrl={blog.imageUrl}
                  date={blog.date}
                  title={blog.title}
                  author={blog.author}
                  authorImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
                  // description={blog.description}
                  // likes={blog.likes}
                  // comments={blog.comments}
                />
              ))}
            </div>
          </div>
          <DrawerBottomToTop
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          > 
          {/* title */}
            <h2 className="text-3xl font-bold px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </h2>
            {/* creator part */}
            <div className="mt-5  w-full px-2 py-1  sticky flex justify-between">
              <div className="flex gap-3">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                  className="object-cover w-[50px] max-sm:w-[50px] max-sm:h-[50px] h-[50px] rounded-full"
                />
                <div className="flex flex-col justify-center">
                  <p className="inline-flex items-center font-semibold text-sm">
                    John Doe
                  </p>
                  <p className="inline-flex items-center text-gray-600 text-xs">
                    26-11-2002
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="p-2 border rounded-full border-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </p>
                <p className="p-2 border rounded-full border-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </p>
              </div>
            </div>
            {/* image part in blog */}
            <div className="rounded-xl mt-6 h-[500px]">
              <img src="https://imageio.forbes.com/specials-images/imageserve/5ed3f78b406024000722e753/People-walking-on-Virginia-beach-and-wading-in-the-water-/960x0.jpg?format=jpg&width=960" alt="" className="h-[500px] object-cover w-full rounded-xl"/>
            </div>
            <div className=" max-sm:px-2 p-7  xl:text-base sm:text-sm   text-xs">
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
              <p className="break-words">{description}</p>
            </blockquote>
          </div>

          <div
            className="px-1 xl:text-base sm:text-sm text-xs"
            dangerouslySetInnerHTML={{ __html: mainContent }}
          ></div>
          <CommentSection />
          </DrawerBottomToTop>
        </section>
      </UserLayout>
    </>
  );
};

export default Blog;
