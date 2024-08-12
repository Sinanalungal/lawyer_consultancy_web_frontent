import React, { useEffect } from "react";
import { AppDispatch, RootState, useAppSelector } from "../../redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDatas } from "../../redux/slice/UserDataFetch";
import { useToast } from "../Toast/ToastManager";

interface FormValues {
  full_name: string;
}

const ProfileForm: React.FC = () => {
  const { userDetail, error, status } = useAppSelector((state: RootState) => state.userData); // Extract error and status from state
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {addToast} = useToast()

  const formik = useFormik({
    initialValues: {
      full_name: userDetail?.full_name || "",
    },
    enableReinitialize: true, // Add this line
    validationSchema: Yup.object({
      full_name: Yup.string()
        .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/, "Please enter a valid Full Name")
        .min(4, "Full name must be at least 4 characters")
        .required("Full name is required"),
    }),
    onSubmit: async (values: FormValues) => {
      try {
        const action = await dispatch(updateUserDatas(values.full_name));
        if (action.meta.requestStatus === "fulfilled") {
          addToast("success", "Profile updated successfully.");
        }
      } catch (error) {
        console.error("Update error:", error);
        // Optionally display an error message
        // addToast("error", "Failed to update profile.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="md:pr-20">
      {/* Display form status or error messages */}
      {formik.status && <div className="text-red-500 text-sm mb-4">{formik.status}</div>}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label
            htmlFor="full_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.full_name && formik.errors.full_name ? 'border-red-500' : ''
            }`}
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.full_name && formik.errors.full_name ? (
            <div className="text-red-500 text-xs">{formik.errors.full_name}</div>
          ) : null}
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
          value={userDetail?.email}
          disabled
          required
        />
      </div>
      <button
        type="submit"
        className="text-nowrap cursor-pointer float-end inline-block text-xs font-semibold bg-slate-800 text-white px-3 py-2 rounded-full"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
