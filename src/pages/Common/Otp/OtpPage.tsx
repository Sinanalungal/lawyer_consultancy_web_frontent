import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OtpForm from "../../../components/Auth/OtpForm";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";

const OtpPage: React.FC = () => {
  const { user, loading } = useSelector((state: any) => state.register);
  const { isAuthenticated, role } = useSelector((state: any) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    const authTokens = localStorage.getItem("authTokens");

    if (isAuthenticated && authTokens) {
      switch (role) {
        case "user":
          navigate("/user");
          break;
        case "lawyer":
          navigate("/lawyer");
          break;
        default:
          navigate("/admin");
          break;
      }
    }
  }, [user, isAuthenticated, role, navigate]);

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen font-roboto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
          >
            {/* Image Section */}
            <div className="hidden md:block relative">
              <img
                src="./pexels-sora-shimazaki-5669602.webp"
                alt="OTP Page Background"
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
                  Verify Your Identity
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80"
                >
                  Enter the OTP sent to your registered email or phone to continue.
                </motion.p>
              </div>
            </div>

            {/* OTP Form Section */}
            <div className="px-10 py-28 flex items-center justify-center">
              <div className="w-full max-w-md">
                <OtpForm />
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

export default OtpPage;
