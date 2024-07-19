import React from 'react';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <form className="flex flex-col justify-center self-center px-4 py-3 mt-10 w-80 max-w-full text-base leading-6 text-gray-500 whitespace-nowrap bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
      <div className="flex gap-2">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce8f75f9fac46ea9c19d721687c414b5591f8f309e14174308b5cec679370a87?apiKey=0ffaeb5c0dea401ba2c163743729b5d3&" className="shrink-0 my-auto w-5 aspect-square" alt="" />
        <label htmlFor="searchInput" className="sr-only">Search</label>
        <input
          type="search"
          id="searchInput"
          placeholder="Search"
          className="flex-1 bg-transparent border-none focus:outline-none"
          aria-label="Search"
        />
      </div>
    </form>
  );
}

export default SearchBar;