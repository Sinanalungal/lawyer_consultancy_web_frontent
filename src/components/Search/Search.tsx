import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchFormProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ search, setSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex justify-end my-2">
      <div className="w-full max-w-lg rounded-xl shadow bg-white text-xs leading-6">
        <div className="relative mx-auto flex w-full px-2 items-center justify-start rounded-xl border">
          <label htmlFor="search-input" className="sr-only">
            Search
          </label>
          <FiSearch size={16} className="text-gray-700" />
          <input
            id="search-input"
            type="text"
            name="search"
            className="h-10 xl:w-[400px] w-full text-sm border border-white rounded-full py-4 pr-1 pl-3 outline-none focus:outline-none focus:ring-0 focus:border-transparent"
            placeholder="Search here..."
            value={search}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
