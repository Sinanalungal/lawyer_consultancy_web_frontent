import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { fetchLawyerList } from "../../../services/apiService";
import useRole from "../../../hooks/useRole";
import Hero from "../../../components/Common/Hero";
import Navbar from "../../../components/Common/Navbar";
import Team from "../../../components/TeamSection/Team";
import Services from "../../../components/Common/Services";
import StoriesComponent from "../../../components/Common/StoriesComponent";
import Footer from "../../../components/Footer/Footer";
import { logout } from "../../../redux/slice/LoginActions";

const LandingPage: React.FC = () => {
  const { registered } = useSelector((state: any) => state.register);
  const { isAuthenticated } = useSelector((store: any) => store.login);
  const [lawyers, setLawyers] = useState<any[]>([]);
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

    fetchLawyerData();
  },[dispatch, isAuthenticated, navigate, registered, authTokens, role]);
  
  const fetchLawyerData = async () => {
    try {
      const lawyerData = await fetchLawyerList();
      setLawyers(lawyerData);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

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

  const teamMembers = lawyers?.map((member) => ({
    name: member.full_name,
    experience: `${member.experience} years`,
    language:'english',
    image: `${process.env.VITE_BASE_URL}${member.profile}`,
    
  }));
  

  return (
    <>
      {!isAuthenticated && <Navbar />}
      <Hero />
      <Services />
      <Team teamMembers={teamMembers} />
      <StoriesComponent/>
      {!isAuthenticated && <Footer/>}
    </>
  );
};

export default LandingPage;
