import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import Services from "../../../components/Common/Services";
import { logout } from "../../../redux/slice/LoginActions";
import Statistic from "../../../components/Statistics/Statistics";
import TestimonalCarousel from "../../../components/Carousel/TestimonalCarousel";
import HeroSection from "../../Common/LandingPage/Checking";
import ThirdLayer from "../../Common/LandingPage/ThirdLayer";

const LawyerLanding: React.FC = () => {
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

    // fetchLawyerData();
  },[dispatch, isAuthenticated, navigate, registered, authTokens, role]);
  
  // const fetchLawyerData = async () => {
  //   try {
  //     const lawyerData = await fetchLawyerList();
  //     setLawyers(lawyerData);
  //   } catch (error) {
  //     console.error("Error fetching lawyers:", error);
  //   }
  // };

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
  
  const statsData = [
    { value: "144", label: "Your Clients" },
    { value: "100", label: "Your Total Sessions" },
    { value: "4.3", label: "Client Satisfaction" },
    
  ];
  const slides = [
    {
      id: 1,
      image: 'https://pagedone.io/asset/uploads/1696229969.png',
      text: 'Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.',
      author: 'Jane D',
    },
    {
      id: 2,
      image: 'https://pagedone.io/asset/uploads/1696229994.png',
      text: 'Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.',
      author: 'Harsh P.',
    },
    {
      id: 3,
      image: 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetimply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry..',
      author: 'Janniey',
    },
    // Add more slides as needed
  ];

  return (
    <>
      Dashboard comes here
      {/* <Hero /> */}
      {/* <UserLayout> */}
      {/* <HeroSection
        title="Expert Legal Guidance"
        title1="In Your Hands..."
        subtitle="Providing personalized legal solutions for Clients needs . Their Happy is in Your Hands"
        buttonText="Set Sessions"
        buttonLink="#"
        borderText="Lawyer Consultancy Web"
      />
      <Statistic stats={statsData} /> */}
      {/* <Services /> */}
      {/* <Team teamMembers={teamMembers} /> */}
      {/* <ThirdLayer/> */}
      {/* <StoriesComponent/> */}
      {/* <TestimonalCarousel slides={slides} /> */}
      {/* </UserLayout> */}
    </>
  );
};

export default LawyerLanding;
