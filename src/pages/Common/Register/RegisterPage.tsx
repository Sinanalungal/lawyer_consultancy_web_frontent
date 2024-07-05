import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterForm from "../../../components/Auth/RegisterForm";

const RegisterPage: React.FC = () => {
  const {loading, registered } = useSelector((state: any) => state.register);
  const { isAuthenticated, role } = useSelector(
    (state: any) => state.login
  );
  // const { lawyers, fetchLawyerData } = useFetchLawyerData();
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

  return (
    <>
      {!loading && (
        <div className="container mx-auto flex items-center justify-center min-h-screen">
          <main className="w-full mx-auto flex">
            <div className="flex-1 hidden lg:flex justify-end">
              <img
                src="./landing_page_lawyer_image.webp"
                className="object-cover    h-full"
                alt="Lawyers"
              />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="w-full space-y-8  bg-slate-50 px-4 text-gray-600">
                <RegisterForm />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
