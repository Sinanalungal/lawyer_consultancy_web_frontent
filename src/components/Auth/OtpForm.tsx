import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerification, ResendOtp } from "../../redux/slice/RegisterActions";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { IoIosClose } from "react-icons/io";
import { useToast } from "../Toast/ToastManager";

interface OtpFormProps {
  // email: string; // Assuming the email is required for OTP verification
}
// interface OtpSubmitProp {
//     email: string;
//     otp:string;
// }

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
      const response = await dispatch(
        OtpVerification({ email: user?.email, otp: otp })
      );
      console.log(response);

      if (response.meta.requestStatus === "fulfilled") {
        setLoader(false);
        addToast("success", "OTP verified successfully!");
        navigate("../login");
      } else {
        addToast("danger", response.payload.message);

        setLoader(false);
        console.log(response);

        // Handle other cases if needed
      }
    } catch (error) {
      addToast("danger", "Something went wrong");
      console.error("Error verifying OTP:", error);
      setLoader(false);
    }
  };

  // Function to handle OTP input change
  const handleInputChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  // Function to render each input in the OTP input component
  const renderInput = (inputProps: any, index: number) => {
    return (
      <input
        {...inputProps}
        key={index}
        style={{
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          textAlign: "center",
          margin: "0 0.5rem",
          border: "1px solid black",
          borderRadius: "0.25rem",
        }}
      />
    );
  };
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
      console.log(response, "response fo resend otp");

      if (response.meta.requestStatus === "rejected") {
        addToast("danger", "Timeout error, please register once again.");
        navigate("/register");
      } else {
        
        setSeconds(response.timer); 
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
      <main className="w-full min-h-screen flex">
        <div className="flex-1 flex items-center h-full my-auto justify-center">
          <div className="w-full max-w-md space-y-8 px-4 bg-slate-50 text-gray-600 sm:px-0">
            <div className="">
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  OTP VERIFICATION
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                className={`${
                  closed
                    ? "hidden"
                    : "bg-yellow-100 mb-4 text-yellow-600 text-xs p-4 w-full rounded-md flex justify-between"
                }`}
              >
                <span>OTP sent to your phone number.</span>
                <span
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setClosed(true)}
                >
                  <IoIosClose size={18} />
                </span>
              </div>

              <div className="w-full flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={handleInputChange}
                  numInputs={6}
                  renderSeparator={<span> </span>}
                  inputStyle="otp-input"
                  renderInput={renderInput}
                />
              </div>

              <div className="w-full flex justify-end">
                {seconds > 0 ? (
                  <p className="font-semibold text-sm cursor-pointer mt-4 mb-5 text-gray-700">
                    {`00:${seconds > 9 ? seconds : `0${seconds}`}`}
                  </p>
                ) : (
                  <p
                    onClick={resendOtp}
                    className="font-semibold text-xs cursor-pointer mt-3 mb-5 hover:underline text-gray-700"
                  >
                    Resend OTP?
                  </p>
                )}
              </div>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={loader}
              >
                {loader ? "Verifying..." : "Verify →"}
                <BottomGradient />
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
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

export default OtpForm;
