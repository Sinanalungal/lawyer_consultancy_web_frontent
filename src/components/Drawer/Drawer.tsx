import React, { useEffect } from 'react';
import { GiSuitcase } from "react-icons/gi";
import { Lawyer } from '../../types';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer?:Lawyer|null;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose ,lawyer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 w-full max-w-md h-full bg-white shadow-xl p-4 overflow-y-auto">
        <button className="absolute text-2xl top-1 right-7 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <div className="p-4">
          {lawyer?.user_profile_image?(<img
            src={lawyer.user_profile_image}
            alt="Profile"
            className="w-full h-80 object-cover rounded-lg"
          />):(<img
            src="https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
            alt="Profile"
            className="w-full h-80 object-cover rounded-lg"
          />)}
          <h2 className="text-lg font-bold mt-4">
            {lawyer?.user_full_name} <span className="text-green-500">•</span>
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1"><GiSuitcase size={18}/> {lawyer?.experience} year experience</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-sm text-white py-2 px-4 rounded-full mr-2">
              Message
            </button>
            <button className="border mr-2 text-sm  border-gray-300 text-gray-700 py-2 px-4 rounded-full">
              Sessions
            </button>
            <button className="border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-full">
              Call
            </button>
            
          </div>
          <div className="mt-4 text-sm">
            <p>
              <strong>Bio</strong>
            </p>
            <p>
             {lawyer?.description}
            </p>
            <p className="mt-4">
              <strong>Deparments</strong>
            </p>
            <p>{lawyer?.departments.map(department => department.department_name).join(", ")}</p>
            <p className="mt-4">
              <strong>Languages</strong>
            </p>
            <p>{lawyer?.languages.map(lang => lang.name).join(", ")}</p>
            <p className="mt-4">
              <strong>Location</strong>
            </p>
            <p>{lawyer?.city},{lawyer?.state}</p>
            {/* <p className="mt-4">
              <strong>Website</strong>
            </p>
            <p>ashleyporter.com</p>
            <p className="mt-4">
              <strong>Birthday</strong>
            </p>
            <p>June 23, 1988</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
