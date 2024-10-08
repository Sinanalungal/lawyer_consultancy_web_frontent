import React from "react";
import { motion } from "framer-motion";

interface BlogCardProps {
  imageUrl: string;
  date: string;
  author: string;
  authorImage: string;
  title: string;
  description?: string;
  calling: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  calling,
  date,
  author,
  authorImage,
  title,
  description,

}) => {
  return (
    <motion.div
      onClick={calling}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="overflow-hidden   sm:w-[350px] max-w-[350px] sm:h-[210px] cursor-pointer transition-shadow relative duration-300 bg-gray-900 rounded-lg shadow-lg"
    >
      <p aria-label="Article">
        <img
          src={imageUrl}
          className="object-cover w-full h-56 rounded-t-lg"
          alt={title}
        />
      </p>
      <div className="p-5 pt-7 py-1 w-full bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 text-white rounded-b-lg">
        <div className="flex items-center mb-1">
          <img
            className="w-6 h-6 rounded-full mr-2"
            src={authorImage}
            alt={author}
          />
          <div className="text-xs">
            <span>{author} |</span>
            <span className="mr-2"> {date} </span>
          </div>
        </div>
        <p aria-label="Article" className="inline-block w-full truncate mb-1">
          <h2 className="text-lg font-bold truncate">{title}</h2>
          {/* <h2 className="text-[10px]  truncate">{description}</h2> */}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
