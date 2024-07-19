// import React, { Fragment, useEffect, useState } from "react";
// import {
//   Disclosure,
//   DisclosureButton,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from "@headlessui/react";
// import { Link } from "react-router-dom";

// const navigation = [
//   { name: "Dashboard", href: "#" },
//   { name: "Services", href: "" },
//   {
//     name: "Lawyers",
//     href: "../../../../user/lawyer-list",
//   },
//   { name: "Blogs", href: "../../../../user/blog" },
// ];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//   const [activeItem, setActiveItem] = useState<string | null>(null);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const [isHoveringMenu, setIsHoveringMenu] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Delay function for resetting hoveredItem
//   const delayResetHoveredItem = () => {
//     setTimeout(() => {
//       if (!isHoveringMenu) {
//         setHoveredItem(null);
//       }
//     }, 200); // Adjust this delay as needed
//   };

//   return (
//     <div className="flex justify-center  w-full">
//       <Disclosure as="nav" className="fixed w-full   3xl:container  z-50 px-5 bg-white py-2 border-b-2">
//         {({ open }) => (
//           <>
//             <div className="mx-auto  max-w-7xl  px-2 sm:px-6 lg:px-10">
//               <div className="relative flex h-16 items-center justify-between">
//                 <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                   <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Open main menu</span>
//                   </DisclosureButton>
//                 </div>
//                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                   <div className="flex flex-shrink-0 items-center">
//                     <img
//                       className="h-8 w-auto"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="Your Company"
//                     />
//                   </div>
//                   <div className="hidden pl-10 sm:m sm:block">
//                     <div className="flex space-x-4">
//                       {navigation.map((item) => (
//                         <Menu
//                           key={item.name}
//                           as="div"
//                           className="relative"
//                           onMouseEnter={() => {
//                             setHoveredItem(item.name);
//                             setIsHoveringMenu(true);
//                           }}
//                           onMouseLeave={() => {
//                             setIsHoveringMenu(false);
//                             delayResetHoveredItem();
//                           }}
//                         >
//                           <MenuButton
//                             onClick={() => setActiveItem(item.name)}
//                             className={classNames(
//                               activeItem === item.name
//                                 ? "bg-gray-200 text-black"
//                                 : "text-black hover:bg-gray-100 hover:text-black",
//                               "rounded-md px-3 py-2 text-sm font-medium"
//                             )}
//                             aria-current={activeItem === item.name ? "page" : undefined}
//                           >
//                             {item.name}
//                           </MenuButton>
//                           {hoveredItem === item.name && item.name === "Services" && (
//                             <Transition
//                               as={Fragment}
//                               enter="transition ease-out duration-100"
//                               enterFrom="transform opacity-0 scale-95"
//                               enterTo="transform opacity-100 scale-100"
//                               leave="transition ease-in duration-75"
//                               leaveFrom="transform opacity-100 scale-100"
//                               leaveTo="transform opacity-0 scale-95"
//                             >
//                               <MenuItems
//                                 onMouseEnter={() => {
//                                   setHoveredItem(item.name);
//                                   setIsHoveringMenu(true);
//                                 }}
//                                 onMouseLeave={() => {
//                                   setIsHoveringMenu(false);
//                                   delayResetHoveredItem();
//                                 }}
//                                 className="absolute left-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                               >
//                                 <MenuItem>
//                                   {({ active }) => (
//                                     <Link
//                                       to="/web-dev"
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "block px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       Web Development
//                                     </Link>
//                                   )}
//                                 </MenuItem>
//                                 <MenuItem>
//                                   {({ active }) => (
//                                     <Link
//                                       to="/interface-design"
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "block px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       Interface Design
//                                     </Link>
//                                   )}
//                                 </MenuItem>
//                                 <MenuItem>
//                                   {({ active }) => (
//                                     <Link
//                                       to="/seo"
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "block px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       SEO
//                                     </Link>
//                                   )}
//                                 </MenuItem>
//                                 <MenuItem>
//                                   {({ active }) => (
//                                     <Link
//                                       to="/branding"
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "block px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                     >
//                                       Branding
//                                     </Link>
//                                   )}
//                                 </MenuItem>
//                               </MenuItems>
//                             </Transition>
//                           )}
//                         </Menu>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
//                   <Menu as="div" className="relative ">
//                     <div>
//                       <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                         <span className="absolute -inset-1.5" />
//                         <span className="sr-only">Open user menu</span>
//                         <img
//                           className="h-8 w-8 rounded-full"
//                           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                           alt=""
//                         />
//                       </MenuButton>
//                     </div>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <MenuItem>
//                           {({ active }) => (
//                             <Link
//                               to="userprofile"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}
//                             >
//                               Your Profile
//                             </Link>
//                           )}
//                         </MenuItem>
//                         <MenuItem>
//                           {({ active }) => (
//                             <a
//                               href="#"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}
//                             >
//                               Settings
//                             </a>
//                           )}
//                         </MenuItem>
//                         <MenuItem>
//                           {({ active }) => (
//                             <div
//                             onClick={() => {
//                                 // dispatch(logout());
//                                 // toast.success("User logged out");
//                               }}
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}
//                             >
//                               Sign out
//                             </div>
//                           )}
//                         </MenuItem>
//                       </MenuItems>
//                     </Transition>
//                   </Menu>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="sm:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2">
//                 {navigation.map((item) => (
//                   <Disclosure.Button
//                   key={item.name}
//                   as={Link}
//                   to={item.href}
//                   className={classNames(
//                       "text-black hover:bg-gray-100 hover:text-black",
//                       "block rounded-md px-3 py-2 text-base font-medium"
//                     )}
//                     aria-current={activeItem === item.name ? "page" : undefined}
//                     onClick={() => setActiveItem(item.name)}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>
//       <div className="w-full h-20"></div>
//     </div>
//   );
// }

import  {  useEffect, useState } from "react";

// const navigation = [
//   { name: "Dashboard", href: "#" },
//   { name: "Services", href: "" },
//   {
//     name: "Lawyers",
//     href: "../../../../user/lawyer-list",
//   },
//   { name: "Blogs", href: "../../../../user/blog" },
// ];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navbar() {
  // const [activeItem, setActiveItem] = useState<string | null>(null);
  // const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Delay function for resetting hoveredItem
  // const delayResetHoveredItem = () => {
  //   setTimeout(() => {
  //     if (!isHoveringMenu) {
  //       setHoveredItem(null);
  //     }
  //   }, 200);
  // };

  return (
    <><div className="flex fixed justify-between px-10 z-50 bg-white 3xl:container max-sm:px-3 py-5 items-center   w-full">
      <div className="flex items-center  ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 lg:hidden">
  <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
</svg>

        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2018/11/Vector-of-Simple-Logo-Letter-A-by-gasemraya-2.png"
          className="w-20 h-12 max-sm:hidden object-contain"
          alt=""
        />
        <div className="flex gap-8 max-lg:hidden text-sm items-center pl-8 font-semibold">
          <p className="flex items-center gap-1">
            Services{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
          <p>Lawyers </p>
          <p>Blogs </p>
          <p>Another </p>
        </div>
      </div>
      <div className="flex justify-center sm:gap-1 max-sm:gap-4  md:gap-4 items-center">
        <div className="md:hidden max-sm:hidden">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-black"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="w-64 max-md:hidden bg-slate-100 h-12 flex items-center px-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-gray-700"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="bg-transparent text-[14px] pl-2 border-none focus:outline-none placeholder-gray-700"
            placeholder="Search..."
          />
        </div>
        <div className="px-5 h-12 max-sm:hidden rounded-full flex items-center justify-center text-sm text-black font-semibold">Log In</div>
        <div className="px-5 bg-black h-12 rounded-full flex items-center justify-center text-sm text-white font-semibold">Sign Up</div>

      </div>
      
    </div>
    <div className="h-20"></div></>
  );
}
