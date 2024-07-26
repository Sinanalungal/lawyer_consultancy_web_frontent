import React from "react";

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
            <p className="truncate  text-[10px] text-gray-600 ">
              <p>Experience: 1 Yr</p>
              <p>Language: English</p>
            </p>
            
            <p className=" font-medium text-xs text-gray-600">⭐4</p>
            {/* <p className="py-1 px-2 rounded-full bg-blue-500 inline-block text-xs text-white font-medium">More About</p> */}
            </div>
            </div>
          </div>
);
 


export default LawyerListingCard;
