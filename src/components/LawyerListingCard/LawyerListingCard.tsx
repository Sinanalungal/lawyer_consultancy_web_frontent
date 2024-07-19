import React from "react";
import StarRating from "../StarRating/StarRating";

interface LawyerProps {
  lawyer: {
    name: string;
    status: string;
    specialization: string;
    image: string;
    online: boolean;
  };
}

const LawyerListingCard: React.FC<LawyerProps> = ({ lawyer }) => (
  
          <div className="w-[230px] cursor-pointer ">
            <img src="https://images.inc.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg" alt="" className="h-[250px] object-cover w-[230px]"/>
            <div className="py-3 space-y-1">
            <p className="truncate font-semibold">Lorem Ipsum has been the industry's</p>
            <p className="h-8  overflow-hidden text-[10px]  text-gray-600 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
            <div className="flex justify-between items-center">
            <p className="truncate font-medium text-xs text-gray-600 ">Experience: 1 Yr</p>
            <p className=" font-medium text-xs text-gray-600">⭐4</p>
            {/* <p className="py-1 px-2 rounded-full bg-blue-500 inline-block text-xs text-white font-medium">More About</p> */}
            </div>
            </div>
          </div>
);
  // <div className={`p-4  rounded-md border-gray-100`}>
    {/* <img
      src={lawyer.image}
      alt={lawyer.name}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h2 className="text-base font-bold">{lawyer.name}</h2>
    <p className="text-sm">{lawyer.specialization}</p>
    <span className={`block my-1 text-xs ${lawyer.online ? "text-green-500" : "text-red-500"}`}>
      {lawyer.online ? "Online" : "Offline"}
    </span> */}
    {/* <StarRating rating={4} /> */}
    
  {/* </div> */}


export default LawyerListingCard;
