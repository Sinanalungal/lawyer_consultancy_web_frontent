import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch } from "../../redux/store";
import { registerUserAsync } from "../../redux/slice/RegisterActions";
import { useToast } from "../../components/Toast/ToastManager";
import CustomInput from "../Input/Input";
import CustomButton from "../Button/Button";

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
  const {error}=useSelector(
    (state: any) => state.register
  );

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
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
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
          if (values.role !== "user") {
            addToast("success", "Successfully Registered!");
          } else {
            addToast(
              "info",
              "Proceed to OTP verification, OTP sent to your phone number..."
            );
          }
        }else{
          addToast("danger", error.message);
        }
      } catch (error:any) {
        console.error("Registration error:", error);
        addToast("danger", 'Something Went Wrong');
      }
    },
  });

  return (
    <>
     <h1 className="text-2xl  text-center max-w-md mx-auto mb-2 font-bold">
        Sign up to Lawyer Consultancy
      </h1>

      <form className="py-5" onSubmit={formik.handleSubmit}>
        <CustomInput
          inputType="text"
          placeholder="Your Full Name"
          name="full_name"
          id="full_name"
          label="Full Name"
          error={
            formik.touched.full_name && formik.errors.full_name
              ? formik.errors.full_name
              : ""
          }
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <CustomInput
          inputType="email"
          placeholder="Your Email"
          name="email"
          id="email"
          label="Email"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <CustomInput
          inputType="number"
          placeholder="Your Phone Number"
          name="phone_number"
          id="phone_number"
          label="Phone Number"
          error={
            formik.touched.phone_number && formik.errors.phone_number
              ? formik.errors.phone_number
              : ""
          }
          value={formik.values.phone_number}
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

        <CustomInput
          inputType="password"
          placeholder="Confirm Password"
          name="confirm_password"
          id="confirm_password"
          label="Confirm Password"
          error={
            formik.touched.confirm_password && formik.errors.confirm_password
              ? formik.errors.confirm_password
              : ""
          }
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <CustomButton
          text="Sign Up"
          type="submit"
          className="bg-[#131314] py-3 w-full text-white   hover:bg-slate-900"
        />
      </form>

      <p className="text-[10px] mt-1 w-full text-center">already have an account? <Link to={'../login'}><span className="underline font-medium">Sign In</span></Link></p>
    </>
  );
};

export default RegisterForm;
