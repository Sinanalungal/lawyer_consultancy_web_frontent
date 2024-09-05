// components/UserLayout.tsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Footer/Footer';
import { fetchUserAsync } from '../../redux/slice/UserDataFetch';
import { RingLoader } from 'react-spinners';
import { useLoader } from '../../components/GlobelLoader/GlobelLoader';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.login);
  const { error } = useAppSelector((state) => state.userData);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const lastScrollTop = useRef(0);

  const { loader } = useLoader(); 
  
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserAsync());
    }
  }, [isAuthenticated, dispatch]);

  const spinnerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255)',
    zIndex: 9999,
  };

  return (
    <>
      {loader && ReactDOM.createPortal(
        <div style={spinnerStyle} >
          <RingLoader color="#36d7b7" />
        </div>,
        document.getElementById('portal-div') as HTMLElement
      )}
      <div className="min-h-screen mx-auto justify-center 3xl:container">
        <div className="my-auto">
          <div
            className={`transition-opacity duration-300 ${
              isVisible ? 'visible' : 'invisible'
            }`}
          >
            <Navbar />
          </div>
          {error ? (
            <div className="w-full h-svh flex justify-center items-center text-xs text-gray-600">
              {error}
            </div>
          ) : (
            children
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserLayout;

