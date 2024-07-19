import BlogCard from '../../../components/BlogCard/BlogCard';
import PageTitle from '../../../components/PageTitle/PageTitle';
import UserLayout from '../../../layouts/UserLayout/UserLayout';

const Blog = () => {
  const blogData = [
    {
      imageUrl: 'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      date: '13 Jul 2020',
      title: 'Diving to the deep',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },
    {
      imageUrl: 'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      date: '4 Nov 2020',
      title: 'Conquer the World',
      description: 'Sed ut perspiciatis  unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },
    {
      imageUrl: 'https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      date: '28 Dec 2020',
      title: 'Explore the beautiful',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },{
      imageUrl: 'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      date: '13 Jul 2020',
      title: 'Diving to the deep for the new day of tommorrow for the recognition of the',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },
    {
      imageUrl: 'https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      date: '4 Nov 2020',
      title: 'Conquer the World',
      description: 'Sed ut perspiciatis  unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },
    {
      imageUrl: 'https://images.pexels.com/photos/2123755/pexels-photo-2123755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      date: '28 Dec 2020',
      title: 'Explore the beautiful',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem doloremque.',
      likes: 7400,
      author: 'Lindsay Walton',
      comments: 81,
    },
  ];
  return (
    <>
     <UserLayout>
     {/* <BlogResources title='Blogs' subtitle='All blogs are listed here'/> */}
      <section className="  mx-auto pb-10 dark:bg-dark lg:pb-20 ">
      <PageTitle
        title="BLOGS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />
        <div className="px-4 mx-auto  w-full  sm:max-w-xl md:max-w-full  md:px-24 lg:px-8 ">
      <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3  sm:grid-cols-2  sm:mx-auto lg:max-w-full">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            imageUrl={blog.imageUrl}
            date={blog.date}
            title={blog.title}
            author={blog.author}
            authorImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s'
            // description={blog.description}
            // likes={blog.likes}
            // comments={blog.comments}
          />
        ))}
      </div>
    </div>
      </section>
      </UserLayout>
    </>
  );
};

export default Blog;

