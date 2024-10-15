import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import { motion } from "framer-motion";
import { logout } from "../../redux/slice/LoginActions";
import NotificationLayer from "./Notification";
import { fetchUserSideLawyerList } from "../../services/fetchLawyers";
import { Lawyer } from "../../types";
import Drawer from "../Drawer/Drawer";
import NotificationCountSocket from "./NotificationCountSocket";
// import { useToast } from "../Toast/ToastManager";


interface LawyerListResponse {
  count?: number;
  next?: any;
  previous?: string | null;
  results: Lawyer[];
}
export default function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  const [active, setActive] = useState<string | null>(null);
  const [isHoveringMenu, setIsHoveringMenu] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [lawyersList, setLawyersList] = useState<Lawyer[]>([]);
  const [next, setNext] = useState<string | null>(null); // Total number of pages
  const [search, setSearch] = useState<string>("");
  const [drawerData, setDrawerData] = useState<Lawyer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [openLawyerListView, setOpenLawyerListView] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const params = {
          department: "",
          experience: "",
          language: "",
          search: search,
        };
        const fetchedLawyers: LawyerListResponse = await fetchUserSideLawyerList(
          "userside/lawyers/",
          params as any
        );
        console.log(
          fetchedLawyers?.results,
          "these are the navbar lawyers based on query"
        );

        setLawyersList(fetchedLawyers?.results);
        setNext(fetchedLawyers.next);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    };

    if (isAuthenticated) {
      fetchLawyers();
    }
  }, [search]);

  const handleBlur = () => {
    setTimeout(() => {
      setOpenLawyerListView(false);
    }, 100);
  };
  const handleNextCalling = async () => {
    if (next != null) {
      try {
        const params = {
          department: "",
          experience: "",
          language: "",
          search: search,
        };
        const fetchedLawyers: LawyerListResponse = await fetchUserSideLawyerList(
          next,
          params as any
        );

        setLawyersList([...lawyersList, ...fetchedLawyers?.results]);

        // if (fetchedLawyers.next) {
        setNext(fetchedLawyers?.next);
        // }
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    }
  };
  return (
    <>
      <div className="flex fixed justify-between px-10 z-40 shadow-sm bg-white  3xl:container max-sm:px-3 py-5 items-center w-full">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 lg:hidden cursor-pointer"
            onClick={toggleSidebar}
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <img
            src="/logo.png"
            className="w-20 h-12 max-sm:hidden object-contain"
            alt=""
          />
          <div className="flex gap-8 max-lg:hidden text-sm items-center pl-8 font-semibold">
            <div
              className="relative group "
              onMouseEnter={() => setActive("Services")}
              onMouseLeave={() => setActive(null)}
            >
              <motion.p
                className="flex items-center gap-1 cursor-pointer"
                transition={{ duration: 0.3 }}
              >
                Cases{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.p>
              {active === "Services" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={transition}
                  className="absolute top-[calc(100%_+_.0rem)] py-2 transform  "
                >
                  <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-md p-4 space-y-1">
                    <Link
                      to="../../../../../../user/ongoing-cases"
                      className="block p-1 rounded-md text-sm font-semibold hover:bg-gray-100"
                    >
                      Ongoing Cases
                    </Link>
                    <Link
                      to="../../../../../../user/post-cases"
                      className="block p-1 rounded-md text-sm font-semibold hover:bg-gray-100"
                    >
                      Apply New Case
                    </Link>
                    {/* <Link
                      to="/"
                      className="block p-1 rounded-md text-sm font-semibold hover:bg-gray-100"
                    >
                      Service 3
                    </Link> */}
                  </div>
                </motion.div>
              )}
            </div>

            <Link to={"../../../../user/lawyers"}>
              <p>Lawyers </p>
            </Link>
            <Link to={"../../../../user/appointments"}>
              <p>Appointments</p>
            </Link>
            <Link to={"../../../../user/blog"}>
              <p>Blogs </p>
            </Link>
            <Link to={"../../../../../chat"}>
              <p>Chat</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center sm:gap-4 max-sm:gap-4  md:gap-4 items-center">
          <div className="md:hidden max-sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6  text-black"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-64  max-xl:hidden bg-slate-100 h-12 flex items-center px-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-gray-700"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onFocus={() => setOpenLawyerListView(true)}
              onBlur={handleBlur}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[14px] pl-2 border-none focus:outline-none placeholder-gray-700"
              placeholder="Search..."
            />
          </div>

          {isAuthenticated && (
            <>
              {" "}
              <div
                className="cursor-pointer"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <NotificationCountSocket /> {/*   color="black"  */}
              </div>
              {notificationsOpen && (
                <NotificationLayer onClose={()=>setNotificationsOpen(false)} open={notificationsOpen} />
              )}
            </>
          )}
          {!isAuthenticated ? (
            <>
              <Link to={"/login"}>
                <div className="px-5 h-12 max-sm:hidden rounded-full flex items-center justify-center text-sm text-black font-semibold">
                  Log In
                </div>
              </Link>
              <Link to={"/register"}>
                <div className="px-5 bg-black h-12 rounded-full flex items-center justify-center text-sm text-white font-semibold">
                  Sign Up
                </div>
              </Link>
            </>
          ) : (
            <div
              className="relative group "
              onMouseEnter={() => setActive("Profile")}
              onMouseLeave={() => setActive(null)}
            >
              <motion.p
                className="flex items-center gap-1 cursor-pointer"
                transition={{ duration: 0.3 }}
              >
                <div className="w-[43px] h-[43px] rounded-full flex items-center  justify-center  font-semibold bg-pink-800 overflow-hidden text-white">
                  {userDetail?.profile_image ? (
                    <img
                      src={userDetail?.profile_image}
                      className="object-cover  rounded-full w-[43px] h-[43px]"
                      alt="Profile"
                    />
                  ) : (
                    <p className="text-xl">
                      {userDetail?.full_name && userDetail.full_name.length > 0
                        ? userDetail.full_name[0]
                        : ""}
                    </p>
                  )}
                </div>
              </motion.p>
              {active === "Profile" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={transition}
                  className="absolute  top-[calc(100%_+_.0rem)] py-2 right-0 transform  "
                >
                  <div className="w-48 bg-white border border-gray-200 shadow-lg rounded-md p-4 space-y-1">
                    <div className="w-full flex flex-col items-center py-4">
                      <div className="w-[70px]  h-[70px] overflow-hidden justify-center items-center flex rounded-full font-semibold bg-pink-800 text-white">
                        {userDetail?.profile_image ? (
                          <img
                            src={userDetail?.profile_image}
                            className="object-cover  rounded-full w-[70px]  h-[70px]"
                            alt="Profile"
                          />
                        ) : (
                          <p className="text-3xl">
                            {userDetail?.full_name &&
                            userDetail.full_name.length > 0
                              ? userDetail.full_name[0]
                              : ""}
                          </p>
                        )}
                      </div>
                      <div className="text-center w-full mt-2 font-bold text-sm truncate">
                        {userDetail?.full_name?.toUpperCase()}
                      </div>
                    </div>
                    <Link
                      to="../../../../user/saved-liked-blogs"
                      className="block p-1  text-xs text-gray-700  rounded-md  font-medium hover:bg-gray-100"
                    >
                      Saved & Liked Blogs
                    </Link>
                    <Link
                      to="../../../../user/wallet"
                      className="block p-1  text-xs text-gray-700  rounded-md  font-medium hover:bg-gray-100"
                    >
                      Wallet
                    </Link>
                    <Link
                      to="../../../../user/profile"
                      className="block p-1 rounded-mdr text-xs text-gray-700 font-medium hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <hr />
                    <div
                      onClick={() => dispatch(logout())}
                      className="block p-1 rounded-md cursor-pointer text-xs text-gray-700  font-medium hover:bg-gray-100"
                    >
                      Sign out
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-20"></div>
      {openLawyerListView && (
        <div
          className="fixed right-36 shadow-lg border border-gray-100 p-1 overflow-y-scroll no-scrollbar -mt-2 z-50 max-h-[330px] w-60 rounded-md max-md:hidden bg-white  "
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <p className="flex justify-center p-2 text-sm font-semibold ">
            Lawyers
          </p>
          {lawyersList && lawyersList.length > 0 ? (
            lawyersList.map((lawyer, index) => (
              <div
                onClick={() => {
                  setDrawerData(lawyer);
                  setIsDrawerOpen(true);
                }}
                key={index}
                className="p-2 bg-slate-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-slate-100 flex items-start space-x-2"
              >
                <img
                  src={
                    lawyer.user_profile_image ??
                    "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                  }
                  alt="Lawyer Profile"
                  className="w-10 my-auto rounded-md h-10 object-cover"
                />

                <div className="flex flex-col truncate">
                  <span className="font-semibold text-sm truncate text-gray-900">
                    {lawyer.user_full_name}
                  </span>

                  <span className="text-[10px] text-gray-600 truncate">
                    Department:{" "}
                    {lawyer?.departments.map((department, index) => (
                      <span key={index}>
                        {department.department_name}
                        {index < lawyer.departments.length - 1 && ", "}
                      </span>
                    ))}
                  </span>

                  <span className="text-[10px] text-gray-600 truncate">
                    Language:{" "}
                    {lawyer?.languages.map((language, index) => (
                      <span key={index}>
                        {language.name}
                        {index < lawyer.languages.length - 1 && ", "}
                      </span>
                    ))}
                  </span>

                  <span className="text-[10px] text-gray-600">
                    Experience: {lawyer.experience} Yr
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center text-gray-500">
              <p className="text-[10px]">No lawyer data found</p>
            </div>
          )}

          <div className="flex text-[10px] text-gray-500   justify-end">
            <p
              className="py-2 pr-2 cursor-pointer"
              onClick={() => isAuthenticated && handleNextCalling()}
            >
              More
            </p>
          </div>
        </div>
      )}
      {isSidebarOpen && (
        <div className="fixed inset-0 text-gray-600 lg:hidden z-40 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="relative w-64 h-full overflow-y-scroll  no-scrollbar bg-white shadow-lg z-50">
            <div className="w-full h-[50px] ">
              <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-gray-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.225 5.025a.75.75 0 0 1 1.06 0L12 9.74l4.715-4.715a.75.75 0 0 1 1.06 1.06L13.06 12l4.715 4.715a.75.75 0 1 1-1.06 1.06L12 14.26l-4.715 4.715a.75.75 0 0 1-1.06-1.06L10.94 12 6.225 7.285a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col p-5 space-y-6 ">
              <div className="relative group">
                <button
                  onClick={() => setIsHoveringMenu(!isHoveringMenu)}
                  className="text-base flex gap-1  items-center w-full font-semibold"
                >
                  Cases{" "}
                  {isHoveringMenu ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-3 mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                {isHoveringMenu && (
                  <div className=" top-full  mt-4   w-48 bg-white  border-l-8 border-gray-200 ">
                    <Link
                      to="../../../../../../user/ongoing-cases"
                      className="block px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                    >
                      Ongoing Cases
                    </Link>
                    <Link
                      to="../../../../../../user/post-cases"
                      className="block px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                    >
                      Apply new cases
                    </Link>
                 
                  </div>
                )}
              </div>
              <Link
                to="../../../../user/lawyers"
                className="text-base font-semibold"
                onClick={toggleSidebar}
              >
                Lawyers
              </Link>
              <Link
                to="../../../../user/blog"
                className="text-base font-semibold"
                onClick={toggleSidebar}
              >
                Blogs
              </Link>
              <Link
                to="../../../../user/appointments"
                className="text-base font-semibold"
                onClick={toggleSidebar}
              >
                Appoinments
              </Link>
              <Link
                to={"../../../../../chat"}
                className="text-base sm:hidden font-semibold"
                onClick={toggleSidebar}
              >
                Chat
              </Link>
              <hr />
              {isAuthenticated ? (
                <div
                  className="text-base sm:hidden cursor-pointer font-semibold"
                  onClick={() => {
                    dispatch(logout());
                    toggleSidebar();
                  }}
                >
                  Sign out
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-base sm:hidden cursor-pointer font-semibold"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        lawyer={drawerData}
      />
    </>
  );
}
