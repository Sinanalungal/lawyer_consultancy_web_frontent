import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Lawyer {
  id: number;
  full_name: string;
  profile: string;
  experience: number;
  departments: { id: number; department_name: string }[];
  description: string;
}

interface Props {
  lawyers: Lawyer[];
}

const LawyerCard: React.FC<Props> = ({ lawyers }) => {
  const navigate = useNavigate();

  return (
    <>
      {lawyers.map((lawyer) => (
        <div
          key={lawyer.id}
          className="mx-auto my-10 flex max-w-xs flex-col items-center rounded-xl border px-4 py-4 text-center md:max-w-lg md:flex-row md:items-start md:text-left"
        >
          <div className="mb-4 md:mr-6 md:mb-0">
            <img
              className="h-56 rounded-lg object-cover md:w-56"
              src={`https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
              alt=""
            />
          </div>
          <div>
            <p className="text-xl font-medium text-gray-700">{lawyer.full_name}</p>
            <p className="mb-4 text-sm font-medium text-gray-500">Senior Editor</p>
            <div className="flex space-x-2">
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Articles</p>
                <p className="text-3xl font-medium text-gray-600">13</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Papers</p>
                <p className="text-3xl font-medium text-gray-600">7</p>
              </div>
              <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                <p className="text-sm font-medium text-gray-500">Followers</p>
                <p className="text-3xl font-medium text-gray-600">2.5k</p>
              </div>
            </div>
            <div className="mb-3"></div>
            <div className="flex space-x-2">
              <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
                Message
              </button>
              <button
                className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white"
                onClick={() => {
                  // Handle follow logic here
                }}
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LawyerCard;
