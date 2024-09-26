import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './PrivateRouter/UserPrivateRoute';
import { RingLoader } from 'react-spinners';
import VideoCall from '../pages/Common/VideoCall/VideoCall';
import SavedAndLikedBlogs from '../pages/Common/SavedAndLikedBlogs/SavedAndLikedBlogs';
import NotificationSocket from '../components/Common/NotificationSocket';

// Lazy load pages
const AvailableLawyerSessions = lazy(() => import('../pages/User/LawyerSessions/AvailableLawyerSessions'));
const UserAppointments = lazy(() => import('../pages/User/Appointment/UserAppointments'));
const ClientPostCase = lazy(() => import('../pages/User/CaseManage/ApplyCase'));
const OngoingCases = lazy(() => import('../pages/User/CaseManage/OngoingCases'));
const WalletPage = lazy(() => import('../pages/Lawyer/Wallet/Wallet'));
const LawyerListing = lazy(() => import('../pages/User/LawyerListing/LawyerListing'));
// const BookAppointment = lazy(() => import('../pages/User/BookingAppointment/BookingAppointment'));
const Profile = lazy(() => import('../pages/User/Profile/Profile'));
const Blog = lazy(() => import('../pages/User/Blog/Blog'));
const EditProfilePage = lazy(() => import('../pages/User/Profile/EditProfile'));
const LandingPage = lazy(() => import('../pages/Common/LandingPage/LandingPage'));

function UserRoutes() {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <Suspense
      fallback={
        <div style={spinnerStyle}>
          <RingLoader color="#36d7b7" />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<UserPrivateRoute />}>
          <Route path="" element={<LandingPage />} />
          <Route path="lawyers" element={<LawyerListing />} />
          {/* <Route path="booking" element={<BookAppointment />} /> */}
          
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="available-sessions" element={<AvailableLawyerSessions />} />
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="post-cases" element={<ClientPostCase />} />
          <Route path="ongoing-cases" element={<OngoingCases />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="saved-liked-blogs" element={<SavedAndLikedBlogs />} />
          <Route path="notification-socket" element={<NotificationSocket />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
