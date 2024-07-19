import React from 'react';

interface DepartmentSelectorProps {
  title: string;
  data: string[];
  name: string;
  selectedDepartment: string;
  onChange: (department: string) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ title, data, name, selectedDepartment, onChange }) => {
  return (
    <div className=" flex flex-col justify-center items-start p-4">
      <p className="font-semibold">{title}</p>
      <div className="text-xs mt-4 text-gray-700 space-y-2 w-full">
        {data.map((department) => (
          <label key={department} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={department}
              checked={selectedDepartment === department}
              onChange={() => onChange(department)}
              className="mr-2 h-4 w-4"
            />
            <span className="truncate">{department}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelector;
