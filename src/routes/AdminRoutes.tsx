import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './PrivateRouter/AdminPrivateRoute';
import { RingLoader } from 'react-spinners';
// import AdminWalletPage from '../pages/Admin/Wallet/Wallet';
import WithdrawalRequests from '../pages/Admin/Wallet/WithdrawalTable';

// Lazy load components
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const LawyerList = lazy(() => import('../pages/Admin/LawyerList/LawyerList'));
const UserList = lazy(() => import('../pages/Admin/UserList/UserList'));
const AdminBlog = lazy(() => import('../pages/Admin/Blog/AdminBlog'));
const AdminProfile = lazy(() => import('../pages/Admin/AdminProfile/AdminProfile'));
const AddBlog = lazy(() => import('../pages/Common/BlogManage/AddBlog'));
const AddLawyer = lazy(() => import('../pages/Admin/LawyerList/AddLawyer'));
const CaseList = lazy(() => import('../pages/Admin/ListedCases/CaseList'));
const ScheduleList = lazy(() => import('../pages/Admin/ScheduleList/ScheduleList'));
const BlogManage = lazy(() => import('../pages/Common/BlogManage/BlogManage'));
const SalesReportTable = lazy(() => import('../pages/Admin/SalesReport/SalesReport'));

function AdminRoutes() {
  const spinnerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <>
      <Suspense
        fallback={
          <div style={spinnerStyle}>
            <RingLoader color="#36d7b7" />
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<AdminPrivateRoute />}>
            <Route path="" element={<Dashboard />} />
            <Route path="lawyers" element={<LawyerList />} />
            <Route path="lawyers/add-lawyer" element={<AddLawyer />} />
            <Route path="users" element={<UserList />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="blog/add-blog" element={<AddBlog />} />
            <Route path="case-list" element={<CaseList />} />
            <Route path="self-blog" element={<BlogManage />} />
            <Route path="schedule-list" element={<ScheduleList />} />
            <Route path="sales-report" element={<SalesReportTable />} />
            {/* <Route path="wallet" element={<AdminWalletPage />} /> */}
            <Route path="withdrawal" element={<WithdrawalRequests />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AdminRoutes;
