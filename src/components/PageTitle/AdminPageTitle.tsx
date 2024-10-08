import React from 'react';

interface PageTitleProps {
  title: string;
  description: string;
}

const AdminPageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
    <div className="w-full">
      
      <h1 className="w-full max-[400px]:text-3xl  text-center text-gray-700 font-semibold text-3xl">
        {title}
      </h1>
      <div className="w-full flex justify-center">
        <p className="mb-16 max-w-2xl text-center text-xs sm:text-sm sm:px-12 px-5 text-gray-500 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AdminPageTitle;
