import React from 'react';

interface BlogCardProps {
  imageUrl: string;
  date: string;
  author: string;
  authorImage: string;
  title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageUrl, date, author, authorImage, title }) => {
  return (
    <div className="overflow-hidden transition-shadow relative duration-300 bg-gray-900 rounded-lg shadow-lg">
      <a href="/" aria-label="Article">
        <img src={imageUrl} className="object-cover  w-full h-56 rounded-t-lg" alt="" />
      </a>
      <div className="p-5 pt-7 py-1 w-full  bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0  text-white rounded-b-lg">
        <div className="flex items-center mb-2">
          <img className="w-6 h-6 rounded-full mr-2" src={authorImage} alt={author} />
          <div className="text-xs">
            <span>  {author}  |</span>
            <span className="mr-2"> {date} </span>
          </div>
        </div>
        <a href="/" aria-label="Article" className="inline-block  w-full tru mb-3">
  <h2 className="text-lg font-bold truncate ">{title}</h2>
</a>

      </div>
    </div>
  );
};

export default BlogCard;
