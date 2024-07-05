import React from 'react';

const SearchForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className=" w-full shadow-xl rounded-full  leading-6">
      <form 
        className="relative  mx-auto flex w-full items-center justify-between rounded-full border"
        onSubmit={handleSubmit}
      >
        <svg
          className="absolute left-4 block h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          name="search"
          className="h-14 w-full rounded-full py-4 pr-40 pl-12 outline-none focus:ring-2"
          placeholder="Search here..."
        />
        <button
          type="submit"
          className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-full bg-gray-700 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
