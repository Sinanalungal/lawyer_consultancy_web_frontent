import React from 'react';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  return (
    <div className='w-full font-roboto flex mt-5'>
      <button
        type={type}
        onClick={onClick}
        className={`px-4 text-xs sm:text-sm font-semibold max-w-md mx-auto border rounded-md text-black ${className}`}
        aria-label={ariaLabel}
      >
        {text}
      </button>
    </div>
  );
};

export default CustomButton;
