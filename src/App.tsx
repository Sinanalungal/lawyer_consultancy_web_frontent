import  { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import Modal from './components/Modal/Modal';
import ExtraDataAccessingForm from './components/Auth/ExtraDataAccessingForm';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/Common/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./pages/Common/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Common/Register/RegisterPage'));
const OtpPage = lazy(() => import('./pages/Common/Otp/OtpPage'));
const ForgotPassword = lazy(() => import('./pages/Common/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Common/ResetPassword/ResetPassword'));
// const BookAppointment = lazy(() => import('./pages/User/BookingAppointment/BookingAppointment'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard/Dashboard'));

// Lazy load routes
const UserRoutes = lazy(() => import('./routes/UserRoutes'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
// const LawyerRoute = lazy(() => import('./routes/LawyerRoute'));

function App() {
  const { dataRequired } = useSelector((state: any) => state.login);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(dataRequired); // Update isOpen based on dataRequired
  }, [dataRequired]);
  console.log(process.env.VITE_CLIENT_ID);

  return (
    <>
      {isOpen ? (<Modal  modalOpen={isOpen} setModalOpen={() => {}}>
        <ExtraDataAccessingForm />
        
      </Modal>):
      (<Router>
        <GoogleOAuthProvider clientId={process?.env.VITE_CLIENT_ID || ''}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              {/* <Route path="/date" element={<BookAppointment />} /> */}
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/dash" element={<Dashboard />} />
              {/* <Route path="/lawyer/*" element={<LawyerRoute />} /> */}
            </Routes>
          </Suspense>
        </GoogleOAuthProvider>
      </Router>)
      }

      
    </>
  );
}

export default App;
