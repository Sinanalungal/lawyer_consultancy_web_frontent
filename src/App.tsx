import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';


// Lazy load components and pages
const Modal = lazy(() => import('./components/Modal/Modal'));
const ExtraDataAccessingForm = lazy(() => import('./components/Auth/ExtraDataAccessingForm'));
const ChatComponent = lazy(() => import('./pages/Common/Chat/Chat'));
const LandingPage = lazy(() => import('./pages/Common/LandingPage/LandingPage'));
const LoginPage = lazy(() => import('./pages/Common/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Common/Register/RegisterPage'));
const OtpPage = lazy(() => import('./pages/Common/Otp/OtpPage'));
const ForgotPassword = lazy(() => import('./pages/Common/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Common/ResetPassword/ResetPassword'));

const UserRoutes = lazy(() => import('./routes/UserRoutes'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const LawyerRoutes = lazy(() => import('./routes/LawyerRoutes'));

function App() {
  const { dataRequired } = useSelector((state: any) => state.login);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(dataRequired); 
  }, [dataRequired]);

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <>
      {isOpen ? (
        <Suspense
          fallback={
            <div style={spinnerStyle}>
              <RingLoader color="#36d7b7" />
            </div>
          }
        >
          <Modal modalOpen={isOpen} setModalOpen={() => {}}>
            <ExtraDataAccessingForm />
          </Modal>
        </Suspense>
      ) : (
        <Router>
          <GoogleOAuthProvider clientId={process?.env.VITE_CLIENT_ID || ''}>
            <Suspense
              fallback={
                <div style={spinnerStyle}>
                  <RingLoader color="#36d7b7" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/otp" element={<OtpPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/chat" element={<ChatComponent />} />
                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/lawyer/*" element={<LawyerRoutes />} />
              </Routes>
            </Suspense>
          </GoogleOAuthProvider>
        </Router>
      )}
    </>
  );
}

export default App;
