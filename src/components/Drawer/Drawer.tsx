import React, { useEffect } from 'react';
import { GiSuitcase } from "react-icons/gi";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
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
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-full h-40 object-cover rounded-lg"
          />
          <h2 className="text-lg font-bold mt-4">
            Ashley Porter <span className="text-green-500">•</span>
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1"><GiSuitcase size={18}/> 1 year experience</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full mr-2">
              Message
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-full">
              Call
            </button>
          </div>
          <div className="mt-4 text-sm">
            <p>
              <strong>Bio</strong>
            </p>
            <p>
              Enim feugiat ut ipsum, neque ut. Tristique mi id elementum
              praesent. Gravida in tempus feugiat netus enim aliquet a, quam
              scelerisque. Dictumst in convallis nec in bibendum aenean arcu.
            </p>
            <p className="mt-4">
              <strong>Location</strong>
            </p>
            <p>New York, NY, USA</p>
            <p className="mt-4">
              <strong>Website</strong>
            </p>
            <p>ashleyporter.com</p>
            <p className="mt-4">
              <strong>Birthday</strong>
            </p>
            <p>June 23, 1988</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
