import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterForm from "../../../components/Auth/RegisterForm";
import GoogleLoginButton from "../../../components/GoogleLoginButton/GoogleLoginButton";
import { BeatLoader } from "react-spinners";
import { ArrowUpRight } from "lucide-react";

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
  }, [isAuthenticated, registered, navigate, role]);

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen bg-gradient-to-br from-white to-white font-roboto text-gray-900 flex items-center justify-center p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
          >
            {/* Image Section */}
            <div className="hidden md:block relative">
              <img
                src="/pexels-sora-shimazaki-5669602.webp"
                alt="Register Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-70"></div>
              <div className="relative z-10 p-10 flex flex-col justify-end h-full text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-4"
                >
                  Join Lawyer Link
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80"
                >
                  Create your account and unlock a world of legal expertise and
                  support.
                </motion.p>
              </div>
            </div>

            {/* Registration Form Section */}
            <div className={`${loginWithCredentials?'p-10':'px-10 py-36'} flex items-center justify-center`}>
              <div className="w-full max-w-md">
                {!loginWithCredentials ? (
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                      Sign Up to Lawyer Link
                    </h1>
                    <p className="text-gray-600 mb-8">
                      Choose your preferred sign-up method
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mb-4"
                    >
                      <GoogleLoginButton
                        text="Sign up with Google"
                        className="w-full flex items-center justify-center 
                        bg-white border border-gray-300 
                        text-gray-700 font-semibold 
                        py-3 rounded-xl 
                        hover:bg-gray-50 
                        transition-all duration-300 
                        space-x-3"
                      />
                    </motion.div>

                    <div className="relative my-6 border-t border-gray-300">
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -top-3 
                        bg-white px-4 text-gray-500 text-sm"
                      >
                        or
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => setLoginWithCredentials(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-gray-900 to-gray-700 
  text-white font-semibold py-3 rounded-xl 
  hover:bg-gray-800 transition-all 
  flex items-center justify-center space-x-2 shadow-lg"
                    >
                      Sign up with Credentials
                      <ArrowUpRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </div>
                ) : (
                  <RegisterForm />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div style={spinnerStyle}>
          <BeatLoader color="#312e81" />
        </div>
      )}
    </>
  );
};

export default RegisterPage;
