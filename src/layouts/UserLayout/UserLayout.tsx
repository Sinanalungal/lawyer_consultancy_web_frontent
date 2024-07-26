import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store"; // Assuming RootState is your Redux state type
import { logout } from "../../redux/slice/LoginActions";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Footer/Footer";

interface UserLayoutProps {
  children: React.ReactNode;
}

interface ProfileContextProps {
  profileImage: string;
  setProfileImage: (image: string) => void;
}

interface DecodedToken {
  id: string;
  role: string;

}

interface AuthTokens {
  access: string;
  refresh?: string; 
}

export const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>("");
  const lastScrollTop = useRef(0);

  useEffect(() => {
    if (isAuthenticated) {
      // const tokens = localStorage.getItem('authTokens');
      
      // if (tokens) {
      //   const authTokens: AuthTokens = JSON.parse(tokens);
        
      //   const { access } = authTokens;
      //   const decodedToken: DecodedToken = JSON.parse(atob(access.split('.')[1]));
        
      //   const { id, role } = decodedToken;
        
      //   console.log('User ID:', decodedToken);
      //   console.log('User Role:', role);
  
      // } else {
      //   console.error('No auth tokens found');
      // }
    }
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop <= 0) {
        setIsVisible(true);
      } else if (currentScrollTop > lastScrollTop.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollTop.current = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const authTokens = localStorage.getItem("authTokens");

  //   if (!isAuthenticated || !authTokens) {
  //     dispatch(logout());
  //     navigate("/");
  //   }
  // }, [dispatch, isAuthenticated, navigate]);
  // console.log(profileImage, "hi");

  return (
    <>
      <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
        <div className="min-h-screen mx-auto  justify-center   3xl:container">
          <div className="my-auto ">
            <div
              className={`  transition-opacity duration-300 ${
                isVisible ? "visible" : "invisible"
              }`}
            >
              <Navbar />
            </div>
            {children}
            <Footer />
          </div>
        </div>
      </ProfileContext.Provider>
    </>
  );
};

export default UserLayout;
