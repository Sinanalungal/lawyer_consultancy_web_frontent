import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './PrivateRouter/UserPrivateRoute';

// Lazy load pages
const LawyerListing = lazy(() => import('../pages/User/LawyerListing/LawyerListing'));
const BookAppointment = lazy(() => import('../pages/User/BookingAppointment/BookingAppointment'));
const Profile = lazy(() => import('../pages/Common/Profile/Profile'));
const Blog = lazy(() => import('../pages/Common/Blog/Blog'));
const EditProfilePage = lazy(() => import('../pages/Common/Profile/EditProfile'));
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
