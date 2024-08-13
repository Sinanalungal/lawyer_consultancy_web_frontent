// src/components/LawyerLayout.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store"; // Assuming RootState is your Redux state type
import { logout } from "../../redux/slice/LoginActions";
import { fetchUserAsync } from "../../redux/slice/UserDataFetch";
import { motion } from "framer-motion";

interface LawyerLayoutProps {
  children: React.ReactNode;
  selected: string;
}

const LawyerLayout: React.FC<LawyerLayoutProps> = ({ children, selected }) => {
  const [active, setActive] = useState<boolean>(false);
  const { isAuthenticated,role } = useSelector((state: RootState) => state.login); // Replace RootState with your actual Redux state type
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAsync());
    }
  }, [isAuthenticated, dispatch]);
  const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
  };

  return (
    <div className="bg-white  flex h-screen">
      <aside className="fixed  z-50 ">
        <input type="checkbox" className="peer hidden" id="sidebar-open" />
        <label
          className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 bg-white peer-checked absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
          htmlFor="sidebar-open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Sidebar Navigation"
          className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-slate-900 text-white transition-all md:h-screen md:w-64 lg:w-72"
        >
          {/* Sidebar content */}
          {/* Replace with your sidebar content */}
          <div className="bg-slate-900 mt-4 max-md:py-4 pl-10 md:mt-6">
            <span className="">
              <img
                src="https://www.creativefabrica.com/wp-content/uploads/2018/11/Vector-of-Simple-Logo-Letter-A-by-gasemraya-2.png"
                className="h-10 bg-white rounded-xl"
                alt=""
              />
              {/* <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 align-bottom text-2xl font-bold">U</span>
              <span className="text-xl">rbane</span> */}
            </span>
          </div>
          <div
            className="w-full h-full  flex overflow-y-scroll overflow-x-hidden flex-col justify-between "
            style={{ scrollbarWidth: "none" }}
          >
            {/* <ul className="mt-6 space-y-1 "> */}

            <ul className="space-y-4 mt-10">
              {/* Transaction Button */}
              <li className="relative">
                <button
                  onClick={() => {
                    navigate("../../../../lawyer");
                  }}
                  className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-8 py-4 font-semibold focus:outline-none"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="">Dashboard</span>
                </button>
                {selected == "1" && <SvgComponent />}
              </li>

              {/* Send Money Button */}
              <li className="relative">
                <button
                  onClick={() => {
                    navigate("../../../../lawyer/sessions");
                  }}
                  className="focus:bg-slate-600 hover:bg-slate-600 font-semibold flex w-full space-x-2 rounded-md px-8 py-4 text-gray-300 focus:outline-none"
                >
                  <span>
                 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
</svg>

                  </span>
                  <span className="">Schedule</span>
                </button>
                {selected == "2" && <SvgComponent />}
              </li>

              {/* Payments Button */}
              <li className="relative">
                <button
                  onClick={() => {
                    navigate("../../../../lawyer/appointments");
                  }}
                  className="focus:bg-slate-600 hover:bg-slate-600 font-semibold flex w-full space-x-2 rounded-md px-8 py-4 text-gray-300 focus:outline-none"
                >
                  <span className="text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>                  </span>
                  <span className="">Appointments</span>
                </button>
                {selected == "3" && <SvgComponent />}
              </li>

              {/* Cards Button */}
              <li className="relative">
                <button
                  onClick={() => {
                    navigate("../../../../lawyer/blog");
                  }}
                  className="focus:bg-slate-600 hover:bg-slate-600 font-semibold flex w-full space-x-2 rounded-md px-8 py-4 text-gray-300 focus:outline-none"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                        clipRule="evenodd"
                      />
                      <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                      <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                    </svg>
                  </span>
                  <span className="">Blog</span>
                </button>
                {selected == "4" && <SvgComponent />}
              </li>

              {/* Settings Button */}
              <li className="relative">
                <button
                  onClick={() => {
                    navigate("../../../../admin/subscription");
                  }}
                  className="focus:bg-slate-600 hover:bg-slate-600 font-semibold flex w-full space-x-2 rounded-md px-8 py-4 text-gray-300 focus:outline-none"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                      <path
                        fillRule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="">Subscription</span>
                </button>
                {selected == "5" && <SvgComponent />}
              </li>
            </ul>
            {/* </ul> */}
            {/* User profile section */}
            <div className="my-5  ml-8 flex cursor-pointer">
              <div>
                {userDetail?.profile_image ? (
                  <img
                    src={userDetail?.profile_image}
                    className="object-contain  w-[40px] h-[40px] rounded-full"
                    alt="Profile"
                  />
                ) : (
                  <p className="text-3xl w-[40px] h-[40px] text-center rounded-full bg-white text-black font-medium">
                    {userDetail?.full_name && userDetail.full_name.length > 0
                      ? userDetail.full_name[0]
                      : ""}
                  </p>
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">Admin</p>
                <p className="text-xs text-gray-300">{userDetail.full_name}</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      {/* /Sidebar */}

      {/* Main content */}
      <div className="flex md:pl-60 lg:pl-72  h-full w-full flex-col">
        {/* Navbar */}
        <header className="relative flex flex-col items-center bg-white px-4 py-4 shadow sm:flex-row md:h-20">
          {/* Navbar content */}
          {/* Replace with your navbar content */}
          <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
            <div className="relative ml-10 flex items-center justify-between rounded-md sm:ml-auto">
              <svg
                className="absolute left-3 block h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="name"
                name="search"
                className="h-12 w-full rounded-full text-sm  border border-gray-100 bg-gray-100 py-4 pr-4 pl-9 shadow-sm outline-none focus:border-slate-800"
                placeholder="Search for anything"
              />
            </div>
            <ul className="mx-auto mt-4 flex space-x-6 sm:mx-5 sm:mt-0">
              <li className="">
                <button
                  onClick={() => setActive(!active)}
                  className="flex h-8 w-8 relative group  items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow"
                >
                  <motion.p
                    className="flex items-center gap-1 cursor-pointer"
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.p>
                </button>
              </li>
              {active && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={transition}
                  className="absolute z-50 top-[calc(100%_-_.6rem)] md:top-[calc(100%_-_.8rem)] max-[400px]:right-3 right-36 sm:right-3 transform  "
                >
                  <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-md p-4 space-y-1">
                    
                    <Link
                      to={role=='lawyer'?'../../../../../lawyer/self-blog':'../../../../../admin/self-blog'}
                      className="block p-1  text-xs text-gray-700  rounded-md  font-medium hover:bg-gray-100"
                    >
                      Your Blogs
                    </Link>
                    <Link
                      to="../../../../lawyer/profile"
                      className="block p-1 rounded-mdr text-xs text-gray-700 font-medium hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <hr />
                    <div
                      onClick={() => dispatch(logout())}
                      className="block p-1 rounded-md cursor-pointer text-xs text-red-600  font-medium hover:bg-gray-100"
                    >
                      Sign out
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* <li className="">
                <button className="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </button>
              </li> */}
              <li className="">
                <button className="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-600 hover:text-black hover:shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </header>
        {/* /Navbar */}

        {/* Main content */}
        <div className="h-full  overflow-x-hidden overflow-y-scoll no-scrollbar max-[400px]:p-1 p-2">
          <main
            id="dashboard-main"
            className="min-screen overflow-auto  px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LawyerLayout;

const SvgComponent = ({
  className = "",
  fillColor = "currentColor",
  width = "1em",
  height = "4em",
  ...props
}) => {
  return (
    <svg
      className={`text-white absolute -right-1 -top-1/2 z-10 hidden h-32 w-8 md:block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="399.349 57.696 100.163 402.081"
      width={width}
      height={height}
      {...props}
    >
      <path
        fill={fillColor}
        d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z"
      />
    </svg>
  );
};
