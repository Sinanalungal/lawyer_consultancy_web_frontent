import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import { logout } from "../../../redux/slice/LoginActions";
import HeroSection from "./Hero";
import UserLayout from "../../../layouts/UserLayout/UserLayout";
import ServicesGrid from "../../../components/ServicesProviding/ServiceGrid";
import LawyerFirmSection from "./Delivering";
import LandingAccordion from "./Accordition";


const LandingPage: React.FC = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated } = useSelector((store: any) => store.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authTokens = localStorage.getItem("authTokens");
  const role = useRole(authTokens);

  useEffect(() => {
    if (registered) {
      navigate("/register");
    }

    if (isAuthenticated && role) {
      handleRoleRedirect(role);
    }

    if (!isAuthenticated || !authTokens) {
      dispatch(logout());
    }

  }, [dispatch, isAuthenticated, navigate, registered, authTokens, role]);



  const handleRoleRedirect = (role: string) => {
    switch (role) {
      case "user":
        navigate("/user");
        break;
      case "lawyer":
        navigate("/lawyer");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        break;
    }
  };

  const content = [
    {
      title: "The first rule of Apple club is that you boast about Apple club.",
      description:
        "Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to convert those notes to text? No problem. Langotiya jeetu ka mara hua yaar is ready to capture every thought.",
    },
    {
      title: "Stay productive and organized.",
      description:
        "Manage your daily tasks efficiently and keep track of your appointments with ease. We bring the tools to enhance your workflow and help you stay on top of everything.",
    },
    {
      title: "Seamless integration with all your devices.",
      description:
        "Whether you're at home or on the go, access all your files and notes from any device. Stay connected, stay efficient, and never miss a beat.",
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <>
          <HeroSection />
          <ServicesGrid />
          <LawyerFirmSection content={content} />
          <LandingAccordion />
    
        </>
      ) : (
        <UserLayout>
          <HeroSection />
          <ServicesGrid />
          <LawyerFirmSection content={content} />
          <LandingAccordion />
        
        </UserLayout>
      )}
    </>
  );
};

export default LandingPage;
