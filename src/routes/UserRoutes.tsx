import { Routes, Route } from "react-router-dom";
import UserPrivateRoute from "./PrivateRouter/UserPrivateRoute";
import LawyerListing from "../pages/User/LawyerListing/LawyerListing";
import BookAppointment from "../pages/User/BookingAppointment/BookingAppointment";
import Profile from "../pages/Common/Profile/Profile";
import Blog from "../pages/Common/Blog/Blog";
import EditProfilePage from "../pages/Common/Profile/EditProfile";

function UserRoutes() {
  return (
    <Routes>
      {/* <Route path="*" element={<UserPrivateRoute />}> */}
      <Route path="lawyers" element={<LawyerListing/>} />
      <Route path="booking" element={<BookAppointment />} />
      <Route path="profile" element={<Profile />} />
      <Route path="edit-profile" element={<EditProfilePage />} />
      <Route path="blog" element={<Blog />} />
      {/* </Route> */}
    </Routes>
  );
}

export default UserRoutes;
