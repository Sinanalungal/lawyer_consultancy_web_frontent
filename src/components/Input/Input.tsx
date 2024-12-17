import React from "react";
import { Mail, Lock, Phone, User, AlertCircle } from "lucide-react";

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
  // Select icon based on input type
  const getInputIcon = () => {
    switch (inputType) {
      case 'email':
        return <Mail className="w-5 h-5 text-gray-400" />;
      case 'password':
        return <Lock className="w-5 h-5 text-gray-400" />;
      case 'tel':
      case 'phone':
      case 'phone_number':
        return <Phone className="w-5 h-5 text-gray-400" />;
      case 'name':
      case 'fullname':
      case 'full_name':
        return <User className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mb-4 font-roboto">
      {label && (
        <label
          htmlFor={id}
          className="block sm:text-sm text-xs font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {/* Input Icon */}
        {getInputIcon() && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getInputIcon()}
          </div>
        )}

        <input
          type={inputType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full 
            ${getInputIcon() ? 'pl-10' : 'pl-3'} 
            pr-3 
            py-3 
            sm:text-sm
            text-xs 
            rounded-xl 
            transition-all 
            duration-300 
            ${error 
              ? 'border-red-500 ring-2 ring-red-500/30 focus:border-red-500 focus:ring-red-500/50' 
              : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
            }
            border
            outline-none
          `}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
        />

        {/* Error Icon */}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-1 flex items-center text-xs text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;