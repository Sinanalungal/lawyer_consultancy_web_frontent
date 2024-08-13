import React from "react";
import { Lawyer } from "../../types";

interface LawyerProps {
  lawyer: Lawyer;
}

const LawyerListingCard: React.FC<LawyerProps> = ({ lawyer }) => (
  
  <div className="w-[230px] cursor-pointer ">
    {lawyer.user_profile_image?(<img
      src={lawyer?.user_profile_image}
      alt="Profile Image"
      className="h-[250px] text-xs object-cover rounded w-[230px]"
    />):(<img
      src="https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
      alt="Profile Image"
      className="h-[250px] text-xs rounded object-cover w-[230px]"
    />)}
    <div className="py-3 space-y-1">
      <p className="truncate  font-semibold">
        {lawyer.user_full_name.toLocaleUpperCase()}
      </p>
      <p className="h-8  overflow-hidden text-[10px]  text-gray-600 ">
        Specialized in departments include {lawyer.departments.map(department => department.department_name).join(", ")}      </p>
      <div className="flex justify-between items-center">
        <p className="truncate  text-[10px] text-gray-600 ">
          <p>Experience: {lawyer.experience} Yr</p>
          <p>Language:{lawyer.languages.map(lang => lang.name).join(", ")}</p>
        </p>

        <p className=" font-medium text-xs text-gray-600">⭐4</p>
      </div>
    </div>
  </div>
);

export default LawyerListingCard;
