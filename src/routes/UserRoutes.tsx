import { Routes, Route } from "react-router-dom";
import UserPrivateRoute from "./PrivateRouter/UserPrivateRoute";
import LawyerListing from "../pages/User/LawyerListing/LawyerListing";
import ListingLawyers from "../pages/User/LawyerListing/ListingLawyers";

function UserRoutes() {
  return (
    <Routes>
      {/* <Route path="*" element={<UserPrivateRoute />}> */}
      <Route path="lawyers" element={<LawyerListing/>} />
      <Route path="listed" element={<ListingLawyers/>} />
      {/* </Route> */}
    </Routes>
  );
}

export default UserRoutes;
