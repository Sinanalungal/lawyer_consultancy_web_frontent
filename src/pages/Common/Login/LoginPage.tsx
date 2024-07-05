import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated, user, role, loader } = useSelector(
    (state: any) => state.login
  );
  // const { lawyers, fetchLawyerData } = useFetchLawyerData();
  const navigate = useNavigate();

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
  }, [isAuthenticated, user, registered, navigate, role]);

  return (
    <>
      {!loader && (
        <div className="container mx-auto  flex items-center justify-center min-h-screen">
          <main className="w-full mx-auto flex">
            <div className="flex-1 hidden lg:flex justify-end">
              <img
                src="./landing_page_lawyer_image.webp"
                className="object-cover h-full"
                alt="Lawyers"
              />
            </div>

            <div className="flex-1 flex items-center bg-slate-50 justify-center">
              <div className="w-full space-y-8 px-4  text-gray-600">
                <LoginForm />
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default LoginPage;
