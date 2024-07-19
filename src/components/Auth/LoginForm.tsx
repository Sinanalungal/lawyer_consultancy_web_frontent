import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { Label } from "../Ui/Label";
import { Input } from "../Ui/Input";
import { cn } from "../../utils/cn";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/slice/LoginActions";
import { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/@gmail\.com$/, "Email must end with @gmail.com"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~`^(){}[\]:;<>.,])[A-Za-z\d@$!%*#?&~`^(){}[\]:;<>.,]{8,}$/,
        "Password must contain at least 8 characters"
      ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      console.log("Form values:", values);
      dispatch(loginAsync(values));
    },
  });

  return (
    <div className="max-w-md w-full mx-auto  rounded-lg md:rounded-2xl border shadow-2xl border-gray-100 px-8 z-50 py-8  bg-white dark:bg-black ">
      <h2 className="font-bold text-4xl max-md:text-3xl  text-start text-neutral-800 dark:text-neutral-200">
        Sign In 
      </h2>
      {/* <p className="text-neutral-600 text-xs mt-3  text-center dark:text-neutral-300">
        You can login here by providing your username and the password of your
        account...
      </p> */}

      <form className="my-6" onSubmit={formik.handleSubmit}>
        <LabelInputContainer className="pb-6 relative">
          {/* <Label htmlFor="username">Email</Label> */}
          <Input
            id="username"
            name="username"
            placeholder="Your Email"
            type="email"
            autoComplete="username"
            className="bg-white "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.username && formik.errors.username && (
            // <div className="text-red-500 pl-2 text-xs">
              formik.errors.username
            // {/* </div> */}
          )}
          </div>
        </LabelInputContainer>
        <LabelInputContainer className="pb-6 relative">
          {/* <Label htmlFor="password">Password</Label> */}
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className="bg-white"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="text-red-500 absolute text-xs pl-1 py-[5px] bottom-0 ">
          {formik.touched.password && formik.errors.password && (
            // <div className="text-red-500   text-xs">
              formik.errors.password
            // {/* </div> */}
          )}
          </div>
        </LabelInputContainer>
        <p className="float-right text-xs mb-4 underline mt-1">
          Forget password?
        </p>

        <button
          className="bg-slate-900 relative group/btn  dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-11 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          LOGIN
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <GoogleLoginButton />
        </div>
      </form>
      <p className="text-xs mt-3 text-center">
        Not registered?{" "}
        <Link to={'../register'}><span>
          <strong>Register</strong>
        </span></Link>
      </p>
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

export default LoginForm;
