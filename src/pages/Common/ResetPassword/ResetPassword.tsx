import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ResetPasswordForm from "../../../components/Auth/ResetPasswordForm";
import { BeatLoader } from "react-spinners";

const ResetPassword: React.FC = () => {
  const { loader } = useSelector((state: any) => state.login); // Assuming login state holds the loader
  const navigate = useNavigate();

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  useEffect(() => {
    // Additional logic if necessary, similar to the LoginPage
  }, [navigate]);

  return (
    <>
      {!loader ? (
        <div className="min-h-screen  bg-gradient-to-br from-white to-white font-roboto text-gray-900 flex items-center justify-center p-6 lg:p-10">
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
                alt="Reset Password Background"
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
                  Reset Your Password
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80"
                >
                  Please enter your new password below to reset it.
                </motion.p>
              </div>
            </div>

            {/* Reset Password Form Section */}
            <div className="px-10 py-28 flex items-center justify-center">
              <div className="w-full max-w-md">
                <ResetPasswordForm />
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

export default ResetPassword;
