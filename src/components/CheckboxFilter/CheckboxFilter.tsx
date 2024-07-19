import React, { useState } from "react";

interface CheckboxFilterProps {
  id: string;
  label: string;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ id, label }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    // Handle filtering logic here based on isChecked state
  };

  return (
    <li>
      <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
        <div className="flex items-center h-5">
          <input
            id={id}
            name="filter-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
        </div>
        <div className="ms-2 text-sm">
          <label htmlFor={id} className="font-medium text-gray-900 dark:text-gray-300">
            <div>{label}</div>
            <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
              Some helpful instruction goes here.
            </p>
          </label>
        </div>
      </div>
    </li>
  );
};

export default CheckboxFilter;
