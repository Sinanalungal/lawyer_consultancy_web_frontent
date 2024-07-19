import React from "react";

const EditPassword: React.FC = () => {
  return (
    <form>
      <div className="2xl:grid 2xl:gap-3 2xl:grid-cols-2">
        <div className="mb-6">
          <label
            htmlFor="password"
            className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <p>New Password</p>
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <p>Confirm Password</p>
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••••••••"
            required
          />
        </div>
      </div>
      <div className="text-nowrap float-end inline-block text-xs font-semibold bg-slate-800 text-white px-3 py-2 rounded-full">
        Change Password
      </div>
    </form>
  );
};

export default EditPassword;
