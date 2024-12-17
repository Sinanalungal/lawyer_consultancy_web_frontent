import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification, ResendOtp } from "../../redux/slice/RegisterActions";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { IoIosClose } from "react-icons/io";
import { useToast } from "../Toast/ToastManager";
import CustomButton from "../Button/Button";

interface OtpFormProps {
  // email: string;
}

const OtpForm: React.FC<OtpFormProps> = () => {
  const [otp, setOtp] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const { user, timer } = useSelector((state: any) => state.register);
  const { addToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Function to handle OTP verification submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await dispatch(OtpVerification({ email: user?.email, otp: otp }));
      if (response.meta.requestStatus === "fulfilled") {
        setLoader(false);
        addToast("success", "OTP verified successfully!");
        navigate("../login");
      } else {
        addToast("danger", response.payload.message);
        setLoader(false);
      }
    } catch (error) {
      addToast("danger", "Something went wrong");
      console.error("Error verifying OTP:", error);
      setLoader(false);
    }
  };

  const handleInputChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const renderInput = (inputProps: any, index: number) => (
    <input
      {...inputProps}
      key={index}
      style={{
        width: "3rem",
        height: "3rem",
        fontSize: "1.5rem",
        textAlign: "center",
        margin: "0 0.5rem",
        border: "1px solid gray",
        borderRadius: "0.25rem",
      }}
    />
  );

  const renderInput1 = (inputProps: any, index: number) => (
    <input
      {...inputProps}
      key={index}
      style={{
        width: "20px",
        height: "20px",
        fontSize: "11px",
        textAlign: "center",
        margin: "0 0.5rem",
        border: "1px solid gray",
        borderRadius: "0.25rem",
      }}
    />
  );

  useEffect(() => {
    console.log("Timer:", timer);
    const timerId = setInterval(() => {
      const diffSeconds = calculateTimeLeft(timer);
      console.log("Time left:", diffSeconds);
      setSeconds(diffSeconds);
      if (diffSeconds <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  const calculateTimeLeft = (expirationTime: string) => {
    const now = Math.floor(Date.now() / 1000);
    const timeDiff = new Date(expirationTime).getTime() / 1000 - now;
    return Math.max(Math.floor(timeDiff), 0);
  };

  const resendOtp = async () => {
    try {
      const response = await dispatch(ResendOtp(user));
      if (response.meta.requestStatus === "rejected") {
        addToast("danger", "Timeout error, please register once again.");
        navigate("/register");
      } else {
        const timerString = response.payload.timer as string; // Ensure timer is treated as string
        setSeconds(calculateTimeLeft(timerString));
        startResendTimer();
        addToast("success", "OTP sent successfully");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const startResendTimer = () => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
    }, seconds * 1000);
  };

  return (
    <>
      <h1 className="text-2xl font-roboto text-center mb-10 font-bold">OTP Verification</h1>

      <form onSubmit={handleSubmit}>
      {!closed && (
        <div className="bg-blue-50  mb-6 p-3 rounded-md flex justify-between items-center text-blue-800">
          <span className="text-sm font-roboto">OTP sent to your registered phone number</span>
          <button 
            onClick={() => setClosed(true)} 
            className="text-blue-600 hover:text-blue-800"
          >
            <IoIosClose size={24} />
          </button>
        </div>
      )}

        <div className="w-full max-[400px]:hidden flex justify-center">
          <OtpInput
            value={otp}
            onChange={handleInputChange}
            numInputs={6}
            renderSeparator={<span> </span>}
            inputStyle="otp-input"
            renderInput={renderInput}
          />
        </div>
        <div className="w-full min-[400px]:hidden flex justify-center">
          <OtpInput
            value={otp}
            onChange={handleInputChange}
            numInputs={6}
            renderSeparator={<span> </span>}
            inputStyle="otp-input"
            renderInput={renderInput1}
          />
        </div>

        <div className="w-full flex justify-center">
          {seconds > 0 ? (
            <p className="font-semibold font-roboto text-sm cursor-pointer mt-4 mb-5 text-gray-700">
              {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
            </p>
          ) : (
            <p
              onClick={resendOtp}
              className="font-semibold font-roboto text-xs cursor-pointer mt-3 mb-5 hover:underline text-gray-700"
            >
              Resend OTP?
            </p>
          )}
        </div>

        <CustomButton
          text={`${loader ? "Verifying..." : "Verify"}`}
          type="submit"
          className={`bg-[#131314] py-3 w-full text-white hover:bg-slate-900 ${loader && "disabled"}`}
        />
      </form>
    </>
  );
};

export default OtpForm;
