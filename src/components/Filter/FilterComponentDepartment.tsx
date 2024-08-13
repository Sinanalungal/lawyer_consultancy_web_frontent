import React from 'react';
import { Departments } from '../../types';

interface DepartmentSelectorProps {
  title?: string;
  data?: Departments[];
  name?: string;
  selectedDepartment?: number | null;
  onChange?: (department: number|null) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ title, data, name, selectedDepartment, onChange }) => {
  return (
    <div className=" flex flex-col justify-center truncate items-start p-4">
      <p className="font-semibold">{title}</p>
      <div className="text-xs mt-4 text-gray-700 space-y-2 w-full">
        <label  className="flex items-center">
            <input
              type="radio"
              name={name}
              value={'All'}
              checked={selectedDepartment === null}
              onChange={() => onChange?.(null)}
              className="mr-2 h-4 w-4 "
            />
            <span className="truncate ">All</span>
          </label>
        {data?.map((department) => (
          <label key={department.id} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={department.department_name}
              checked={selectedDepartment === department.id}
              onChange={() => onChange?.(department.id)}
              className="mr-2 h-4 w-4 "
            />
            <span className="truncate ">{department.department_name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelector;
