import React from "react";
import { Lawyer } from "../../types";
import { motion } from "framer-motion";

interface LawyerProps {
  lawyer: Lawyer;
}

const LawyerListingCard: React.FC<LawyerProps> = ({ lawyer }) => (
  
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }} 
  className="w-[230px] relative  rounded-md shadow bg-white p-2 cursor-pointer ">
<p className="absolute top-44 right-2 bg-gray-800 rounded-l-full rounded-t-full p-2 font-medium text-xs text-gray-400">⭐4</p>
    {lawyer.user_profile_image?(<img
      src={lawyer?.user_profile_image}
      alt="Profile Image"
      className="h-[200px] text-xs object-cover rounded w-[230px]"
    />):(<img
      src="https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
      alt="Profile Image"
      className="h-[200px] text-xs rounded object-cover w-[230px]"
    />)}
    <div className="py-3 space-y-1">
      <p className="truncate   text-center text-lg font-bold">
        {lawyer.user_full_name.toLocaleUpperCase()}
      </p>
      <p className="h-8 text-center font-medium overflow-hidden text-[10px]  text-gray-600 ">
        Specialized in departments include {lawyer.departments.map(department => department.department_name).join(", ")}      </p>
      <div className="flex flex-col justify-between font-medium items-center">
        <p className="truncate text-center  text-[10px] text-gray-600 ">
          <p>Experience: {lawyer.experience} Yr</p>
          <p>Language:{lawyer.languages.map(lang => lang.name).join(", ")}</p>
        </p>
      </div>
    </div>
  </motion.div>
);

export default LawyerListingCard;
