import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  type: 'success' | 'danger' | 'info';
  message: string;
  onClose: () => void;
  duration?: number; // Duration for auto-close in milliseconds
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 5000 }) => {
  const iconClasses = {
    success: 'text-white bg-green-600',
    danger: 'text-white bg-red-600',
    info: 'text-white bg-blue-600',
  };

  const iconPaths = {
    success: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
    ),
    danger: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
    ),
    info: (
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
    ),
  };

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed sm:top-4 top-1 px-2 right-0 sm:right-4 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`flex gap-2 items-center w-full max-w-xs p-4 mb-4 text-white rounded-lg shadow-lg relative ${iconClasses[type]} bg-opacity-90`}>
          <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${iconClasses[type]}`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              {iconPaths[type]}
            </svg>
            <span className="sr-only">{type} icon</span>
          </div>
          <div className="ml-3 text-sm font-medium">{message}</div>
          <button type="button" className="ml-auto bg-transparent text-white hover:text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-300 dark:hover:text-white" onClick={onClose} aria-label="Close">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close</span>
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
