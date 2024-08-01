import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store"; 
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Footer/Footer";
import { fetchUserAsync } from "../../redux/slice/UserDataFetch";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.login);
  const {  error } = useAppSelector((state) => state.userData);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();
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

      lastScrollTop.current = currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAsync());
    }
  }, [isAuthenticated, dispatch]);

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
      <div className="min-h-screen mx-auto justify-center 3xl:container">
        <div className="my-auto">
          <div
            className={`transition-opacity duration-300 ${
              isVisible ? "visible" : "invisible"
            }`}
          >
            <Navbar />
          </div>
          {error ? (
            <div className="w-full h-svh flex justify-center items-center text-xs text-gray-600">{error}</div>
          ) : (
            children
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
