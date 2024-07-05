import React, { useEffect } from "react";
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
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
};

export default UserLayout;