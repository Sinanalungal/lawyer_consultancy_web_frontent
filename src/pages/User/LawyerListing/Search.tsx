import React, { useState, useCallback } from "react";

interface SearchComponentProps {
  setSearchOpen: (isOpen: boolean) => void;
  onSearch: (query: string) => void;
}

const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  setSearchOpen,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
      setSearchOpen(false);
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        placeholder="Search..."
        className="input border text-xs focus:border-2 border-gray-300 px-5 py-3 rounded-xl max-w-56 md:min-w-64 transition-all duration-500 ease-in-out sm:focus:w-72 outline-none transform-gpu sm:hover:scale-105"
        name="search"
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <p
        className="w-full h-full font-semibold text-gray-400 p-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
        onClick={() => {
          setSearchOpen(false), onSearch("");
        }}
      >
        x
      </p>
    </div>
  );
};

export default SearchComponent;
