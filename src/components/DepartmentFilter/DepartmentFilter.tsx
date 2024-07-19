import React from "react";

interface DepartmentFilterProps {
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({ selectedOption, onChange }) => (
  <div className=" max-xl:hidden rounded-xl px-4">
    <p className="text-xl py-3 font-medium">Department</p>
    <div className="py-6 ">
      <select
        value={selectedOption}
        onChange={onChange}
        className="border bg-transparent rounded-xl shadow-sm text-xs p-2 w-full"
      >
        <option value="">Select a department</option>
        <option value="individual">Individual</option>
        <option value="company">Company</option>
        <option value="nonprofit">Non profit</option>
      </select>
    </div>
  </div>
);

export default DepartmentFilter;
