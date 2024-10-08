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
      title: "Expert Legal Advice at Your Fingertips",
      description:
        "Get access to professional legal consultation from experienced lawyers in various fields. Whether you need help with family law, criminal defense, or corporate matters, we have you covered.",
    },
    {
      title: "Easy Case Submission Process",
      description:
        "Submit your legal case securely through our platform. Provide details, upload relevant documents, and get matched with lawyers who are ready to assist you. Receive timely feedback on whether they can take your case.",
    },
    {
      title: "Seamless Consultation Scheduling",
      description:
        "Book consultations effortlessly with our intuitive scheduling tool. Choose a time that works for you, and consult with your preferred lawyer at your convenience, either in person or online.",
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
