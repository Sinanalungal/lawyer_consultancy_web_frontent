import React, { useState } from 'react';

interface DatePickerProps {
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onSelectDate(e.target.value); // Pass selected date back to parent component
  };

  return (
    <div className="relative mt-4 w-56">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        className="block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm"
        type="text"
        placeholder="Select date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
