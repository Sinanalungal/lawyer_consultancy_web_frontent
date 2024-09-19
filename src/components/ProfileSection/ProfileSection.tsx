import React from "react";
import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/slice/LoginActions";

const ProfileSection: React.FC = () => {
    const { role } = useSelector((state: RootState) => state.login as LoginState)
  const { userDetail } = useAppSelector((state: RootState) => state.userData);
  return (
    <section className="relative pt-20">
      <div className="w-full absolute bg-[#d9e3ed] top-0 left-0 z-0 h-40 object-cover" />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 bg-white">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          {userDetail?.profile_image ? (
            <img
              src={userDetail?.profile_image}
              alt="user-avatar-image"
              className="border-4 object-cover border-solid w-[140px] bg-slate-100 h-[140px] border-white rounded-full"
            />
          ) : (
            <div className="bg-pink-800 w-[140px] border-white border-4 h-[140px]  text-white text-6xl font-medium flex items-center justify-center rounded-full">
              {userDetail?.full_name && userDetail?.full_name.length > 0
                ? userDetail?.full_name[0]
                : ""}
            </div>
          )}
        </div>
        <div className="flex  flex-col sm:flex-row sm:gap-5 items-center justify-between mb-5">
          <div>
            <h3 className="font-manrope  font-bold text-3xl sm:text-4xl flex-grow text-gray-900 mb-1">
              {userDetail?.full_name}
            </h3>
            <div className="font-normal max-sm:py-3 w-full text-xs  sm:text-sm leading-7 text-gray-500">
              <div className="font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="truncate max-sm:max-w-[200px]">
                  {" "}
                  {userDetail?.email}
                </p>
              </div>

              <div className="font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="truncate max-sm:max-w-[200px]">
                  {userDetail?.phone_number}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/user/edit-profile" >
              <button className="sm:py-3.5 py-1.5  px-5 rounded-full bg-slate-800 text-white font-semibold text-xs sm:text-base leading-7 shadow-sm transition-all duration-500 hover:bg-indigo-700">
                Edit Profile
              </button>
            </Link>
            {/* <button className="sm:py-3.5 py-3 px-5 rounded-full bg-indigo-50 text-slate-800 font-semibold text-base leading-7 shadow-sm transition-all duration-500 hover:bg-indigo-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="sm:h-5 sm:w-5 w-4 h-4"
              >
                <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
