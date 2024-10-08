import React from "react";
import { Lawyer } from "../../types";
import { motion } from "framer-motion";
import './LawyerListingCard.css'
interface LawyerProps {
  lawyer: Lawyer;
}

const LawyerListingCard: React.FC<LawyerProps> = ({ lawyer }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center cursor-pointer mx-auto p-4 max-sm:w-full mb-12  sm:w-[400px] transition-all duration-300"
  >
    {/* Circular Profile Image */}
    <div className="mb-4 flex justify-center items-center rounded-full overflow-hidden border border-gray-300 w-[220px] h-[220px]">
      {lawyer.user_profile_image ? (
        <img
          src={lawyer.user_profile_image}
          alt="profile Image"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src="/justice-law-design.png"
          alt="default Profile Image"
          className="w-full h-full object-cover"
        />
      )}
    </div>

    {/* Lawyer Details */}
    <div className="flex flex-col items-center">
      <h2 className="text-lg max-sm:text-xs font-bold w-[95%] text-gray-800 truncate">
        Adv. {lawyer.user_full_name.toUpperCase()}
      </h2>
      
      <p className="text-sm text-gray-700 grid  mt-1">
        <span className="mx-auto"> {lawyer.languages.map((lang) => lang.name).join(", ")}</span>
      </p>
      <p className="text-sm text-gray-700 grid  mt-1">
        <span className="mx-auto"> {lawyer.experience} Yr of Experience</span>
      </p>
      <p className="text-sm text-gray-700 grid  mt-1">
        <span className="mx-auto">{lawyer.departments.map((department) => department.department_name).join(", ")}</span>
      </p>

      <button className="text-sm font-medium my-2 bg-[#1e266e] px-4 text-white py-1.5 rounded-xl">
        Connect
      </button>

    
    </div>
  </motion.div>
);

export default LawyerListingCard;
