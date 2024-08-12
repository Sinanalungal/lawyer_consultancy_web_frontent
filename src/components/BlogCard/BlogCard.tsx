import React from "react";

interface BlogCardProps {
  imageUrl: string;
  date: string;
  author: string;
  authorImage: string;
  title: string;
  calling: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  calling,
  date,
  author,
  authorImage,
  title,
}) => {
  return (
    <div
      onClick={calling}
      className="overflow-hidden cursor-pointer transition-shadow relative duration-300 bg-gray-900 rounded-lg shadow-lg"
    >
      <p aria-label="Article">
        <img
          src={imageUrl}
          className="object-cover  w-full h-56 rounded-t-lg"
          alt=""
        />
      </p>
      <div className="p-5 pt-7 py-1 w-full  bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0  text-white rounded-b-lg">
        <div className="flex items-center mb-2">
          <img
            className="w-6 h-6 rounded-full mr-2"
            src={authorImage}
            alt={author}
          />
          <div className="text-xs">
            <span>{author}|</span>
            <span className="mr-2"> {date} </span>
          </div>
        </div>
        <p
          aria-label="Article"
          className="inline-block  w-full tru mb-3"
        >
          <h2 className="text-lg font-bold truncate">{title}</h2>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;