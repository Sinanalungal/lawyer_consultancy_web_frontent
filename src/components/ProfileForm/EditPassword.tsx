import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePassword } from "../../services/Blogs";
import { useToast } from "../Toast/ToastManager";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slice/LoginActions";

interface FormValues {
  previous_password: string;
  new_password: string;
  confirm_password: string;
}

const EditPassword: React.FC = () => {
  const { addToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      previous_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      previous_password: Yup.string().required("Previous password is required"),
      new_password: Yup.string()
        .required("New password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~`^(){}[\]:;<>.,])[A-Za-z\d@$!%*#?&~`^(){}[\]:;<>.,]{8,}$/,
          "New password must contain at least 8 characters, one letter, one number, and one special character"
        ),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .required("Confirm password is required"),

      // confirm_password: Yup.string()
      //   .oneOf(
      //     [Yup.ref("new_password"), null || undefined],
      //     "Passwords must match"
      //   )
      //   .required("Confirm password is required"),
    }),
    onSubmit: async (values: FormValues) => {
      try {
        const response = await updatePassword({
          currentPassword: values.previous_password,
          newPassword: values.new_password,
          confirmPassword: values.confirm_password,
        });
        addToast("success", "Password Changed Successfully");
        console.log("Password changed successfully:", response);
        dispatch(logout());
        // Optionally show a success message
      } catch (error) {
        console.error("Password change error:", error);
        addToast("danger", "Something went wrong");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="2xl:grid 2xl:gap-3 2xl:grid-cols-2">
        <div className="mb-6">
          <label
            htmlFor="previous_password"
            className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <p>Previous Password</p>
          </label>
          <input
            type="password"
            id="previous_password"
            name="previous_password"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.previous_password &&
              formik.errors.previous_password
                ? "border-red-500"
                : ""
            }`}
            placeholder="••••••••••••••"
            value={formik.values.previous_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.previous_password &&
          formik.errors.previous_password ? (
            <div className="text-red-500 text-xs">
              {formik.errors.previous_password}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="new_password"
            className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <p>New Password</p>
          </label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.new_password && formik.errors.new_password
                ? "border-red-500"
                : ""
            }`}
            placeholder="••••••••••••••"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.new_password && formik.errors.new_password ? (
            <div className="text-red-500 text-xs">
              {formik.errors.new_password}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <p>Confirm Password</p>
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              formik.touched.confirm_password && formik.errors.confirm_password
                ? "border-red-500"
                : ""
            }`}
            placeholder="••••••••••••••"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? (
            <div className="text-red-500 text-xs">
              {formik.errors.confirm_password}
            </div>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className="text-nowrap cursor-pointer float-end inline-block text-xs font-semibold bg-slate-800 text-white px-3 py-2 rounded-full"
      >
        Change Password
      </button>
    </form>
  );
};

export default EditPassword;
