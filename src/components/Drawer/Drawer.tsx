import React, { useEffect } from "react";
// import { GiSuitcase } from "react-icons/gi";
import { Lawyer } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
// import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { createOrGetThread } from "../../services/Chat";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer?: Lawyer | null;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, lawyer }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onMessageClick = async () => {
    if (lawyer?.user_pk) {
      try {
        await createOrGetThread(lawyer.user_pk);
        navigate(`../../../../../chat`);
      } catch (error) {
        console.error("something error", error);
      }
    }
  };

  return (
    <div
      className={`fixed inset-0   z-50 transition-transform duration-500 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="fixed  inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out"
        onClick={onClose}
      ></div>
      <div className="absolute pb-10 right-0 top-0 w-full max-w-md h-full bg-white shadow-xl p-4 overflow-y-auto transform transition-transform duration-500 ease-in-out">
        <button
          className="absolute text-5xl top-1 right-7 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-4 flex mt-3 flex-col items-center">
          {lawyer?.user_profile_image ? (
            <img
              src={lawyer.user_profile_image}
              alt="Profile"
              className="w-full h-80 object-cover border-2 rounded-lg"
            />
          ) : (
            <img
              src="/justice-law-design.png"
              alt="Profile"
              className=" h-80 w-80 object-cover border-2 rounded-full"
            />
          )}
          <h2 className="text-lg font-bold mt-4">
            {lawyer?.user_full_name.toUpperCase()}{" "}
            <span className="text-green-500">•</span>
          </h2>
          <p className="text-[14px] font-semibold mt-1 text-gray-700 flex items-center gap-1">
            {lawyer?.experience} YEAR EXPERIENCE
          </p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onMessageClick()}
              className="bg-slate-800 text-[14px] text-white py-4 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            >
              <FaMessage />
            </button>
            <div
              onClick={() =>
                navigate("../../../../../../user/available-sessions", {
                  state: { id: lawyer?.pk },
                })
              }
            >
              <button className="bg-slate-800 text-[14px] text-white py-4 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110">
                <FaVideo />
              </button>
            </div>
           
          </div>

          <div className="mt-4 text-start text-[14px]">
           <p> <p>
              <strong>Bio</strong>
            </p>
            <p className="text-gray-700">{lawyer?.description}</p>
            </p>
            <p className="grid grid-cols-2">
            <p>
           <p className="mt-4 ">
              <strong>Languages</strong>
            </p>
            <p className="text-gray-700">
              {lawyer?.languages.map((lang) => lang.name).join(", ")}
            </p>
           </p>
           <p> <p className="mt-4">
              <strong>Location</strong>
            </p>
            <p className="text-gray-700">
              {lawyer?.city}, {lawyer?.state}
            </p></p>
            </p>
           <p>
           <p className="mt-4">
              <strong>Departments</strong>
            </p>
            <p className="text-gray-700">
              {lawyer?.departments
                .map((department) => department.department_name)
                .join(", ")}
            </p>
           </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
