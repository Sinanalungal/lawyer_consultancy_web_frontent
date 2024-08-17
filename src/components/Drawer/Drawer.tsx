import React, { useEffect } from "react";
import { GiSuitcase } from "react-icons/gi";
import { Lawyer } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer?: Lawyer | null;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, lawyer }) => {
  const navigate = useNavigate()
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

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-500 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 w-full max-w-md h-full bg-white shadow-xl p-4 overflow-y-auto transform transition-transform duration-500 ease-in-out">
        <button
          className="absolute text-2xl top-1 right-7 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-4 flex flex-col items-center">
          {lawyer?.user_profile_image ? (
            <img
              src={lawyer.user_profile_image}
              alt="Profile"
              className="w-full h-80 object-cover rounded-lg"
            />
          ) : (
            <img
              src="https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
              alt="Profile"
              className="w-full h-80 object-cover rounded-lg"
            />
          )}
          <h2 className="text-lg font-bold mt-4">
            {lawyer?.user_full_name.toUpperCase()} <span className="text-green-500">•</span>
          </h2>
          <p className="text-xs mt-1 text-gray-700 flex items-center gap-1">
            {lawyer?.experience} YEAR EXPERIENCE
          </p>
          <div className="mt-4 flex space-x-2">
            <button className="bg-slate-800 text-sm text-white py-4 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110">
              <FaMessage />
            </button>
            <div
  onClick={() => navigate("../../../../../../user/available-sessions", {
    state: { id: lawyer?.pk },
  })}
>
              <button className="bg-slate-800 text-sm text-white py-4 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110">
                <FaVideo />
              </button>
            </div>
            <button className="bg-slate-800 text-sm text-white py-4 px-4 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110">
              <IoCall />
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            <p>
              <strong>Bio</strong>
            </p>
            <p className="text-gray-700">{lawyer?.description}</p>
            <p className="mt-4">
              <strong>Departments</strong>
            </p>
            <p className="text-gray-700">
              {lawyer?.departments
                .map((department) => department.department_name)
                .join(", ")}
            </p>
            <p className="mt-4">
              <strong>Languages</strong>
            </p>
            <p  className="text-gray-700">{lawyer?.languages.map((lang) => lang.name).join(", ")}</p>
            <p className="mt-4">
              <strong>Location</strong>
            </p>
            <p className="text-gray-700">
              {lawyer?.city}, {lawyer?.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
