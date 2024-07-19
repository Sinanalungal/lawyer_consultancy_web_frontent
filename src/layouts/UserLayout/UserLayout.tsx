import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store"; // Assuming RootState is your Redux state type
import { logout } from "../../redux/slice/LoginActions";
import { IoSearch } from "react-icons/io5";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Footer/Footer";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  //   const { isAuthenticated, role } = useSelector((state: RootState) => state.login); // Replace RootState with your actual Redux state type
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      if (currentScrollTop <= 0) {
        setIsVisible(true); 
      } else if (currentScrollTop > lastScrollTop.current) {
        setIsVisible(false); 
      } else {
        setIsVisible(true); 
      }
      
      lastScrollTop.current = currentScrollTop; // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const authTokens = localStorage.getItem('authTokens');

  //     if (!isAuthenticated || !authTokens) {
  //       dispatch(logout());
  //       navigate('/login');
  //     }

  //   }, [dispatch, isAuthenticated, navigate]);

  return (
    <>
    <div className="min-h-screen mx-auto  justify-center   3xl:container">
    <div className="my-auto ">
    <div className={`  transition-opacity duration-300 ${isVisible ? "visible" : "invisible"}`}>
    <Navbar/>
    </div>
    {children}
    <Footer/>
    </div>
    </div>
    </>
  )
};

export default UserLayout;