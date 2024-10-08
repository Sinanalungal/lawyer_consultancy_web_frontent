import React from "react";

interface CustomInputProps {
  inputType?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  label?: string;
  error?: string;
  value?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  inputType = "text",
  placeholder = "",
  name = "",
  id = "",
  label = "",
  error = "",
  value = "",
  required = false,
  onChange,
  onBlur,
}) => {
  return (
    <div className="max-w-md h-[90px] mx-auto">
      <label
        htmlFor={id}
        className="block text-xs font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-[1px] rounded-md shadow-sm">
        <input
          type={inputType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full rounded-md   sm:py-3 py-4   px-3 text-gray-900 ring-0 ring-inset placeholder:text-gray-400 text-xs sm:leading-6 ${
            error
              ? "border-red-500 border ring-red-500 focus:ring-red-500 "
              : "border-gray-200 border ring-0 focus:ring-[linear-gradient(90deg,_#7F00FF,_#E100FF)]"
          }`}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-700"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-[1px] text-[10px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
