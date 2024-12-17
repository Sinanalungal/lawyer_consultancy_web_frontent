import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import LoginForm from "../../../components/Auth/LoginForm";
import { BeatLoader } from "react-spinners";
// import { ArrowUpRight } from "lucide-react";

const LoginPage: React.FC = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated, role, loader } = useSelector(
    (state: any) => state.login
  );
  const navigate = useNavigate();

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  useEffect(() => {
    if (registered) {
      navigate("/register");
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

  return (
    <>
      {!loader ? (
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
                alt="Login Background"
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
                  Lawyer Link
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80"
                >
                  Connect with expert legal professionals and get the guidance
                  you need.
                </motion.p>
              </div>
            </div>

            {/* Login Form Section */}
            <div className="p-10 flex items-center justify-center">
              <div className="w-full max-w-md">
                <LoginForm />
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

export default LoginPage;
