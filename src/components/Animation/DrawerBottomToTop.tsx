import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface DrawerBottomToTopProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DrawerBottomToTop: React.FC<DrawerBottomToTopProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? "5%" : "100%" }}
        transition={{ 
          type: "spring", 
          stiffness: 200, // Decrease stiffness for a slower animation
          damping: 25,    // Increase damping for smoother motion
          duration: 0.8   // Increase duration for a longer animation
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        className="inset-x-0 pb-14 absolute bottom-0 h-9/10 bg-white rounded-t-lg shadow-lg p-4 max-h-full no-scrollbar overflow-y-auto"
      >
        <div className="max-w-screen cursor-pointer no-scrollbar overflow-y-scroll">
          <div className="max-w-6xl mx-auto">
            <div onClick={onClose} className="float-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="pt-10">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DrawerBottomToTop;
