import React from 'react';

interface EditProfileTabsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const EditProfileTabs: React.FC<EditProfileTabsProps> = ({ options, selected, onSelect }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select your option</label>
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Tabs for larger screens */}
      <ul className="max-sm:hidden text-base  font-normal inline-block text-gray-500    ">
        {options.map((option, index) => (
          <li key={index} className="w-full focus-within:z-10">
            <a
              href="#"
              className={`inline-block whitespace-nowrap text-nowrap text-sm w-full py-4 px-20 border-gray-200 dark:border-gray-700  focus:outline-none ${selected === option ? 'text-gray-900 font-bold ' : ' hover:text-gray-800 '}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(option);
              }}
            >
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditProfileTabs;
