import React from 'react';
import {  Languages } from '../../types';

interface LanguageSelectorProps {
  title?: string;
  data?: Languages[];
  name?: string;
  selectedlanguages?: number | null;
  onChange?: (department: number|null) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ title, data, name, selectedlanguages, onChange }) => {
  return (
    <div className=" flex flex-col justify-center items-start p-4">
      <p className="font-semibold">{title}</p>
      <div className="text-xs mt-4 text-gray-700 space-y-2 w-full">
      <label  className="flex items-center">
            <input
              type="radio"
              name={name}
              value={'All'}
              checked={selectedlanguages === null}
              onChange={() => onChange?.(null)}
              className="mr-2 h-4 w-4"
            />
            <span className="truncate">All</span>
          </label>
        {data?.map((languages) => (
          <label key={languages.id} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={languages.name}
              checked={selectedlanguages === languages.id}
              onChange={() => onChange?.(languages.id)}
              className="mr-2 h-4 w-4"
            />
            <span className="truncate">{languages.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
