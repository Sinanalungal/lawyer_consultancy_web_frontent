import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LawyerPrivateRoute from "./PrivateRouter/LawyerPrivateRoute";
import { BeatLoader  } from "react-spinners";

// Lazy load components
const FailPage = lazy(() => import("../pages/User/SuccessFailPages/FailPage"));
const SuccessPage = lazy(() =>
  import("../pages/User/SuccessFailPages/SuccessPage")
);
const Blog = lazy(() => import("../pages/User/Blog/Blog"));
const LawyerSessionManage = lazy(() =>
  import("../pages/Lawyer/LawyerSession/LawyerSessionManage")
);
const BlogManage = lazy(() => import("../pages/Common/BlogManage/BlogManage"));
const AddBlog = lazy(() => import("../pages/Common/BlogManage/AddBlog"));
const LawyerAppointments = lazy(() =>
  import("../pages/Lawyer/LawyerAppointment/LawyerAppointments")
);
const LawyerProfile = lazy(() =>
  import("../pages/Lawyer/LawyerProfile/LawyerProfile")
);
const LawyerCaseManagement = lazy(() =>
  import("../pages/Lawyer/LawyerCasePage/LawyerCaseManage")
);
const AvailableCases = lazy(() =>
  import("../pages/Lawyer/LawyerCasePage/AvailableCases")
);
const LawyerWalletPage = lazy(() => import("../pages/Lawyer/Wallet/Wallet"));
const LawyerDashboard = lazy(() =>
  import("../pages/Lawyer/Dashboard/LawyerDashboard")
);

function LawyerRoutes() {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <Suspense
      fallback={
        <div style={spinnerStyle}>
          <BeatLoader  color="#312e81" />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<LawyerPrivateRoute />}>
          <Route path="" element={<LawyerDashboard />} />
          <Route path="profile" element={<LawyerProfile />} />
          <Route path="blog" element={<Blog />} />
          <Route path="sessions" element={<LawyerSessionManage />} />
          <Route path="appointments" element={<LawyerAppointments />} />
          <Route path="cases" element={<LawyerCaseManagement />} />
          <Route path="available-cases" element={<AvailableCases />} />
          <Route path="self-blog" element={<BlogManage />} />
          <Route path="blog/add-blog" element={<AddBlog />} />
          <Route path="wallet" element={<LawyerWalletPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="fail" element={<FailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default LawyerRoutes;
