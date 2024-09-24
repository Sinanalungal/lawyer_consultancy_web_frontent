import React from "react";
import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/slice/LoginActions";

const ProfileSection: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.login as LoginState);
  const { userDetail } = useAppSelector((state: RootState) => state.userData);

  return (
    <section className="relative pt-20">
      {/* Top Background Section */}
      <div className="w-full absolute bg-gradient-to-r  from-blue-500 via-indigo-500 to-blue-700 top-0 left-0 z-0 h-56 object-cover" >
      <h2 className="text-3xl font-semibold pb-6 pt-10 max-sm:text-xl text-white text-center">
            USER PROFILE
          </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mb-8  bg-white rounded-lg shadow-lg relative z-10 mt-10 pb-8">
        <div className="px-6 py-8 sm:px-8">
          {/* Profile Image */}
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-6">
            {userDetail?.profile_image ? (
              <img
                src={userDetail?.profile_image}
                alt="user-avatar-image"
                className="border-4 object-cover border-solid w-[150px] bg-slate-100 h-[150px] border-white rounded-full shadow-lg"
              />
            ) : (
              <div className="bg-gradient-to-br from-pink-600 to-red-500 w-[150px] border-white border-4 h-[150px] text-white text-6xl font-medium flex items-center justify-center rounded-full shadow-lg">
                {userDetail?.full_name && userDetail?.full_name.length > 0
                  ? userDetail?.full_name[0]
                  : ""}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex flex-col sm:flex-row sm:gap-5 items-center justify-between mb-5">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-4xl sm:text-5xl text-gray-900 mb-2">
                {userDetail?.full_name}
              </h3>
              <div className="font-normal text-sm sm:text-base text-gray-500 mb-4">
                <div className="font-semibold flex items-center justify-center sm:justify-start mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 mr-1 text-indigo-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="truncate max-sm:max-w-[200px]">
                    {userDetail?.email}
                  </p>
                </div>

                <div className="font-semibold flex items-center justify-center sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 mr-1 text-indigo-600"
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

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/user/edit-profile">
                <button className="py-2 px-4 sm:py-3 sm:px-6 rounded-full bg-indigo-600 text-white font-semibold text-xs sm:text-base shadow-lg transition-all duration-500 hover:bg-indigo-700">
                  Edit Profile
                </button>
              </Link>

              {/* Notification Icon */}
              <button className="relative py-2 px-4 sm:py-3 sm:px-6 rounded-full bg-gray-200 text-gray-700 font-semibold text-xs sm:text-base shadow-lg transition-all duration-500 hover:bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="sm:h-5 sm:w-5 w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4 border-gray-300" />

          {/* Role Information */}
          {role && (
            <div className="text-center sm:text-left">
              <span className="inline-block py-1 px-4 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
                Role: {role}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
