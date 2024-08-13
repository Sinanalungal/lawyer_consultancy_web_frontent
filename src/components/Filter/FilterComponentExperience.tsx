import React from 'react';

interface ExperienceSelectorProps {
  title?: string;
  data?: string[];
  name?: string;
  selectedKey?: string;
  onChange?: (department: string) => void;
}

const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({ title, data, name, selectedKey, onChange }) => {
  return (
    <div className=" flex flex-col justify-center items-start p-4">
      <p className="font-semibold">{title}</p>
      <div className="text-xs mt-4 text-gray-700 space-y-2 w-full">
        {data?.map((department) => (
          <label key={department} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={department}
              checked={selectedKey === department}
              onChange={() => onChange?.(department)}
              className="mr-2 h-4 w-4"
            />
            <span className="truncate">{department}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSelector;
