import React, { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../redux/store";

const ProfileForm: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const { userDetail } = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (userDetail) {
      setFullName(userDetail.full_name || "");
    }
  }, [userDetail]);

  return (
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={userDetail?.phone_number}
            pattern="[0-9]{10}"
            disabled
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          // placeholder="john.doe@company.com"
          value={userDetail?.email}
          disabled
          required
        />
      </div>
      <div className="text-nowrap float-end inline-block text-xs font-semibold bg-slate-800 text-white px-3 py-2 rounded-full">
        Update Profile
      </div>
    </form>
  );
};

export default ProfileForm;
