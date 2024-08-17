import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './PrivateRouter/UserPrivateRoute';
import AvailableLawyerSessions from '../pages/User/LawyerSessions/AvailableLawyerSessions';
import UserAppointments from '../pages/User/Appointment/UserAppointments';

// Lazy load pages
const LawyerListing = lazy(() => import('../pages/User/LawyerListing/LawyerListing'));
const BookAppointment = lazy(() => import('../pages/User/BookingAppointment/BookingAppointment'));
const Profile = lazy(() => import('../pages/User/Profile/Profile'));
const Blog = lazy(() => import('../pages/User/Blog/Blog'));
const EditProfilePage = lazy(() => import('../pages/User/Profile/EditProfile'));
const LandingPage = lazy(() => import('../pages/Common/LandingPage/LandingPage'));

function UserRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<UserPrivateRoute />}>
          <Route path='' element={<LandingPage />} />
          <Route path="lawyers" element={<LawyerListing />} />
          <Route path="booking" element={<BookAppointment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="available-sessions" element={<AvailableLawyerSessions />} />
          <Route path="appointments" element={<UserAppointments />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
