import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/slice/LoginActions";
import { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import CustomInput from "../Input/Input";
import CustomButton from "../Button/Button";
import { useToast } from "../Toast/ToastManager";

interface FormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  meta: {
    requestStatus: "fulfilled" | "rejected";
  };
}

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();
  const { error } = useSelector((state: any) => state.login);
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
    onSubmit: async (values: FormValues) => {
      console.log("Form values:", values);
      try {
        const response = ((await dispatch(
          loginAsync(values)
        )) as unknown) as LoginResponse; // Type assertion to LoginResponse
        console.log(response);

        if (response.meta.requestStatus === "fulfilled") {
          addToast("success", "User Logged in successfully");
        } else if (response.meta.requestStatus === "rejected") {
          console.log(error, "this is the  error message");
          if (error) {
            addToast("danger", error);
          } else {
            addToast("danger", "check your credentials");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        addToast("danger", "An unexpected error occurred.");
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl text-center mb-1 font-extrabold text-gray-900 leading-snug">
        Sign In
      </h1>
      <p className="text-center text-sm mb-3 text-gray-600">
        Access your account and manage your cases efficiently.
      </p>

      <GoogleLoginButton
        text="Sign in with Google"
        className="bg-white border  font-black text-xs max-w-md mx-auto h-12 rounded-xl"
      />
      {/* Divider */}
      <div className="relative my-6 border-t border-gray-300">
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-3 
          bg-white px-4 text-gray-500 text-sm"
        >
          or
        </span>
      </div>

      <form className="my-6" onSubmit={formik.handleSubmit}>
        <CustomInput
          inputType="email"
          placeholder="Your Email"
          name="username"
          id="username"
          label="Email"
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""
          }
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <CustomInput
          inputType="password"
          placeholder="Password"
          name="password"
          id="password"
          label="Password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="max-w-md text-end  mx-auto text-[10px] px-1 underline">
          <Link to={"/forgotpassword"}>Forgot Password?</Link>
        </p>

        <CustomButton
          text="Sign In"
          type="submit"
          className="bg-[#131314] py-3 w-full text-white   hover:bg-slate-900"
        />
      </form>

      <p className="text-xs w-full text-center">
        Don't have an account?{" "}
        <Link to={"../register"}>
          <span className="underline font-medium">Sign Up</span>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
