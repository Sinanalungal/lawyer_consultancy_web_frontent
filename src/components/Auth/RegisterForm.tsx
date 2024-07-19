import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Ui/Input";
import { cn } from "../../utils/cn";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch } from "../../redux/store";
import { registerUserAsync } from "../../redux/slice/RegisterActions";
import { useToast } from '../../components/Toast/ToastManager'; 

interface FormValues {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      role: "user",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)?$/, "Please enter a valid Full Name")
        .min(4, "Full name must be at least 4 characters")
        .required("Full name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/@gmail\.com$/, "Email must be a valid Gmail address"),

      phone_number: Yup.string()
        .matches(/^\d{10}$/, "Please enter a valid Phone Number")
        .required("Phone number is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
          "Password must be valid"
        )
        .required("Password is required"),

      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values: FormValues) => {
      try {
        const action = await dispatch(registerUserAsync(values));
        if (action.meta.requestStatus === "fulfilled") {
          Cookies.set("registration_start", "true", {
            expires: 10 / (24 * 60),
          });
          navigate("/otp");
          if (values.role !== 'user') {
            addToast('success', 'Successfully Registered!');
          } else {
            addToast('info', 'Proceed to otp verification, OTP sent to your phone number...');
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto   rounded-lg md:rounded-2xl border shadow-2xl border-gray-100 px-8 z-50 py-8  bg-white dark:bg-black ">
      <h2 className="font-bold text-4xl max-md:text-3xl  text-neutral-800 dark:text-neutral-200">
        Sign Up
      </h2>
      {/* <p className="text-neutral-600 text-xs max-w-sm mt-2 dark:text-neutral-300">
        Provide valid credentials to create an account and enjoy the features.
      </p> */}

      <form className="my-6" onSubmit={formik.handleSubmit}>
        <LabelInputContainer className="pb-5 relative">
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Your Full Name"
            className="bg-white"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.full_name && formik.errors.full_name && (
            // <div className="text-red-500 text-xs pl-2 mt-1">
              formik.errors.full_name
            // </div>
          )}
          </div>
        </LabelInputContainer>

        <LabelInputContainer className="pb-5 relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            className="bg-white"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.email && formik.errors.email && (
            // <div className="text-red-500 pl-2 text-xs mt-1">
              formik.errors.email
            // </div>
          )}
          </div>
        </LabelInputContainer>

        <LabelInputContainer className="pb-5 relative">
          <Input
            id="phone_number"
            name="phone_number"
            type="text"
            placeholder="Your Phone Number"
            className="bg-white"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.phone_number && formik.errors.phone_number && (
            // <div className="text-red-500 pl-2 text-xs mt-1">
              formik.errors.phone_number
            // </div>
          )}
          </div>
        </LabelInputContainer>

        <LabelInputContainer className="pb-5 relative">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="bg-white"
            value={formik.values.password}
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.password && formik.errors.password && (
            // <div className="text-red-500 pl-2 text-xs mt-1">
              formik.errors.password
            // </div>
          )}
          </div>
        </LabelInputContainer>

        <LabelInputContainer className="pb-5 relative">
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className="bg-white"
            autoComplete="new-password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              // <div className="text-red-500 pl-2 text-xs mt-1">
                formik.errors.confirm_password
              // </div>
            )}
            </div>
        </LabelInputContainer>

        <button
          className="bg-slate-900 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          REGISTER 
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <GoogleLoginButton />
        </div>

        <p className="text-xs mt-3 text-center">
          Already Registered?{" "}
          <Link to="../login">
            <strong>Login</strong>
          </Link>
        </p>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegisterForm;
