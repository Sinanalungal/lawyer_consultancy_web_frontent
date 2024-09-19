import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from "react";

interface MenuOption {
  label: string;
  action: () => void;
}

interface SelectionBoxProps {
  buttonLabel: string | boolean;
  options: MenuOption[];
}

const SelectionBox: React.FC<SelectionBoxProps> = ({
  buttonLabel,
  options,
}) => {
  
  return (
    <Menu as="div" className="relative bg-slate-100 rounded-md inline-block text-left">
      <div>
        <MenuButton className="inline-flex  w-[140px] justify-between gap-x-1.5  bg-transparent px-3 py-2 text-xs items-center font-semibold text-gray-900   ring-gray-300 hover:bg-gray-50">
          {buttonLabel}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-3"
          >
            <path
              fill-rule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>

          {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-36  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {options.map((option, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <button
                  onClick={option.action}
                  className={`block w-full px-4 py-2 text-left text-xs ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default SelectionBox;
