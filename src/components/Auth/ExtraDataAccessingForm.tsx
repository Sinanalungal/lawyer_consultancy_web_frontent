import React, { useEffect, useState } from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modaloff } from "../../redux/slice/LoginActions";
import CustomInput from "../Input/Input";
import CustomButton from "../Button/Button";
import { useToast } from "../Toast/ToastManager";
import PageTitle from "../PageTitle/PageTitle";

// Type for the form values
interface FormValues {
  phone_number: string;
  password: string;
  otp: string;
}

// Type for the decoded JWT token
interface DecodedToken {
  id: string;
  role: string;
  email: string;
}

// Type for the authentication tokens
interface AuthTokens {
  access: string;
  refresh?: string;
}

// Type for the Redux state (update as per your actual state shape)
interface RootState {
  login: {
    isAuthenticated: boolean;
  };
}

const ExtraDataAccessingForm: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const [openPassword, setOpenPassword] = useState(false);
  const [otpVerification, setOtpVerification] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [timer, setTimer] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      const tokens = localStorage.getItem("authTokens");

      if (tokens) {
        const authTokens: AuthTokens = JSON.parse(tokens);

        const { access } = authTokens;
        const decodedToken: DecodedToken = JSON.parse(
          atob(access.split(".")[1])
        );

        const { email } = decodedToken;
        setEmail(email);
      } else {
        console.error("No auth tokens found");
      }
    }
  }, [isAuthenticated]);

  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
      .required("Phone number is required"),
    password: openPassword
      ? Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            "Password must contain at least one letter, one number, and one special character"
          )
          .required("Password is required")
      : Yup.string().notRequired(),
    otp: Yup.string().length(6, "Please enter a valid 6-digit OTP"),
  });

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      phone_number: "",
      password: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!openPassword) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/save-data-request/`, {
            email: userEmail,
            phone_number: values.phone_number,
            otp: values.otp,
          });
          addToast("success", res.data.message);
          dispatch(modaloff());
        } catch (e:any) {
          addToast("danger", e.response.data.message);
        }
      } else {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/save-data-request/`, {
            email: userEmail,
            phone_number: values.phone_number,
            password: values.password,
            otp: values.otp,
          });
          addToast("success", res.data.message);
          dispatch(modaloff());
        } catch (e:any) {
          addToast("danger", e.response.data.message);
        }
      }
    },
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const calculateTimeLeft = (expirationTime: string) => {
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeDiff = new Date(expirationTime).getTime() / 1000 - now; // Time difference in seconds
        return Math.max(Math.floor(timeDiff), 0); // Ensure timer is not negative
      };
      const time = calculateTimeLeft(timer);
      setSeconds(time);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const sendOTP = async () => {
    if (formik.isValid && formik.values.phone_number && userEmail) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otpsend/`, {
          phone_number: formik.values.phone_number,
          email: userEmail,
        });
        if (res.status === 200) {
          setOtpVerification(true);
          addToast("info", "OTP Sent to your phone number");
          setTimer(res.data.timer);
        }
      } catch (e) {
        addToast("danger", "Failed to send OTP");
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <PageTitle
        title="Complete Profile"
        description="Complete your profile from here"
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
      {openPassword ? (
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
      ) : (
        <div
          onClick={() => setOpenPassword(true)}
          className="w-full flex gap-1 text-gray-800 max-sm:mt-6 mt-1 justify-center items-center text-[10px] mb-3 cursor-pointer"
        >
          Set Password <FaArrowDown size={8} />
        </div>
      )}
      {otpVerification && (
        <>
          <CustomInput
            inputType="text"
            placeholder="Enter OTP"
            name="otp"
            id="otp"
            label="OTP"
            error={
              formik.touched.otp && formik.errors.otp ? formik.errors.otp : ""
            }
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {seconds > 0 ? (
            <p className="text-xs w-full flex justify-end cursor-pointer">
              {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
            </p>
          ) : (
            <p
              className="text-xs w-full flex justify-end cursor-pointer"
              onClick={sendOTP}
            >
              Resend OTP?
            </p>
          )}
        </>
      )}
      {otpVerification ? (
        <CustomButton
          text="Save"
          type="submit"
          className="bg-[#131314] py-3 w-full text-white hover:bg-slate-900"
        />
      ) : (
        <CustomButton
          onClick={sendOTP}
          text="Send OTP"
          type="button"
          className="bg-[#131314] py-3 w-full text-white hover:bg-slate-900"
        />
      )}
    </form>
  );
};

export default ExtraDataAccessingForm;
