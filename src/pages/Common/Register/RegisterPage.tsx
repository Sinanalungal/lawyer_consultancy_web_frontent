import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterForm from "../../../components/Auth/RegisterForm";
import GoogleLoginButton from "../../../components/GoogleLoginButton/GoogleLoginButton";
import { BeatLoader } from "react-spinners";

const RegisterPage: React.FC = () => {
  const { loading, registered } = useSelector((state: any) => state.register);
  const { isAuthenticated, role } = useSelector((state: any) => state.login);
  const [loginWithCredentials, setLoginWithCredentials] = useState<boolean>(
    false
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate("/otp");
    }
    const authTokens = localStorage.getItem("authTokens");

    if (isAuthenticated && authTokens) {
      if (role === "user") {
        navigate("/user");
      } else if (role === "lawyer") {
        navigate("/lawyer");
      } else {
        navigate("/admin");
      }
    }
  }, [isAuthenticated, registered]);
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      {!loading ? (
        <div className="3xl:container  min-h-screen flex mx-auto">
          <div
            className={`w-[600px]  2xl:w-[800px] xl:h-screen  3xl:h-full h-full 3xl:hidden max-lg:hidden bg-slate-500 ${
              loginWithCredentials && "md:h-[700px]"
            }`}
          >
            <img
              src="/pexels-sora-shimazaki-5669602.webp"
              alt=""
              className="h-full 2xl:w-[800px] xl:flex-1 xl:fixed xl:h-screen 3xl:h-full  min-h-screen w-[600px] object-cover"
            />
          </div>
          <div className="w-full flex flex-col xl:flex-1 max-w-4xl py-8 mx-auto justify-center items-center">
            <div className={!loginWithCredentials ? " p-5 " : "w-full  px-10"}>
              {!loginWithCredentials ? (
                <>
                  <h1 className="text-2xl text-center mb-12 font-bold">
                    Sign up to Lawyer Consultancy
                  </h1>
                  <GoogleLoginButton
                    text="Sign up with google"
                    className="text-sm sm:text-base sm:h-16 bg-black text-white h-14 rounded-full"
                  />

                  <div className="my-5 relative w-[80%] flex justify-center mx-auto border-t border-gray-300 ">
                    <p className="absolute top-0 -mt-3 text-gray-500  bg-white px-5">
                      or
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLoginWithCredentials(true)}
                    className="w-full bg-white flex my-4 justify-center items-center font-semibold text-sm sm:text-base sm:h-16 h-14 rounded-full gap-2 text-black border border-gray-300"
                  >
                    Sign up with Credentials
                  </button>
                </>
              ) : (
                <>
                  <RegisterForm />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={spinnerStyle}>
          <BeatLoader  color="#312e81" />
        </div>
      )}
    </>
  );
};

export default RegisterPage;
