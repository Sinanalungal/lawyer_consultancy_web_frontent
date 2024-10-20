import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OtpForm from "../../../components/Auth/OtpForm";

const OtpPage: React.FC = () => {
  const {  user, loading } = useSelector(
    (state: any) => state.register
  );
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

  return (
    <>
      {!loading && (
        <div className="3xl:container min-h-screen flex mx-auto">
          <div className="w-[600px]  2xl:w-[800px] xl:h-screen 3xl:h-full h-full 3xl:hidden max-lg:hidden bg-slate-500">
            <img
              src="./pexels-sora-shimazaki-5669602.webp"
              alt=""
              className="h-full 2xl:w-[800px] xl:flex-1 xl:fixed xl:h-screen 3xl:h-full  min-h-screen w-[600px] object-cover"
            />
          </div>
          <div className="w-full flex xl:flex-1 flex-col max-w-4xl mx-auto justify-center items-center">
            <div className="w-full py-8 px-10">
              <OtpForm />
            </div>
          </div>
        </div>
      
      )}
    </>
  );
};

export default OtpPage;
