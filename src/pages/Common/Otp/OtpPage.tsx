import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OtpForm from "../../../components/Auth/OtpForm";

const OtpPage: React.FC = () => {
  const { registered, user, loading } = useSelector(
    (state: any) => state.register
  );
  const { isAuthenticated, role } = useSelector((state: any) => state.login);
  // const { lawyers, fetchLawyerData } = useFetchLawyerData();
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
        <div className="2xl:container flex justify-center items-center mx-auto  bg-slate-100 bg-cover 3xl:bg-none lg:bg-[url('./still-life-with-scales-justice.webp')] sm:bg-cover ">
        <div className="w-screen min-h-screen grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-1">
          <div className="flex justify-center items-center px-4 py-10">
            <OtpForm />
          </div>
        </div>
      </div>
        // <div className="container mx-auto  flex items-center justify-center min-h-screen">
        //   <main className="w-full mx-auto flex">
        //     <div className="flex-1 hidden lg:flex justify-end">
        //       <img
        //         src="./landing_page_lawyer_image.webp"
        //         className="object-cover h-full"
        //         alt="Lawyers"
        //       />
        //     </div>

        //     <div className="flex-1 flex items-center bg-slate-50 justify-center">
        //       <div className="w-full space-y-8 px-4  text-gray-600">
        //         <OtpForm />
        //       </div>
        //     </div>
        //   </main>
        // </div>
      )}
    </>
  );
};

export default OtpPage;
