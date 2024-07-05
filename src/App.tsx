import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './pages/Common/LandingPage/LandingPage';
import LoginPage from './pages/Common/Login/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RegisterPage from './pages/Common/Register/RegisterPage';
import OtpPage from './pages/Common/Otp/OtpPage';
import BookAppointment from './pages/User/Booking';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Dashboard from './pages/Admin/Dashboard/Dashboard';

function App() {

  // const { dataRequired } = useSelector((state: any) => state.login);
  const [isOpen, setIsOpen] = useState(false);
  
  // useEffect(() => {
  //   setIsOpen(dataRequired); // Update isOpen based on dataRequired
  // }, [dataRequired]);
  console.log(process.env.VITE_CLIENT_ID);

  return (
    <>
     {/* {isOpen && (<Modal isOpen={isOpen} onClose={() => {}}>
        <ExtraDataAccess />
      </Modal>)} */}

      <Router>
        <GoogleOAuthProvider clientId={process?.env.VITE_CLIENT_ID || ''}>
          <Routes>

            <Route path='/' element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/otp" element={<OtpPage/>} />
            <Route path="/date" element={<BookAppointment/>} />
            <Route path="/user/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/dash" element={<Dashboard/>} />
            
            {/* <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/lawyer/*" element={<LawyerRoute />} /> */}
          
          </Routes>
        </GoogleOAuthProvider>
      </Router>
    </>
  )
}

export default App
