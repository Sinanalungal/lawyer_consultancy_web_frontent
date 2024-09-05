import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './PrivateRouter/AdminPrivateRoute';
import { RingLoader } from 'react-spinners';

// Lazy load components
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const LawyerList = lazy(() => import('../pages/Admin/LawyerList/LawyerList'));
const UserList = lazy(() => import('../pages/Admin/UserList/UserList'));
const AdminBlog = lazy(() => import('../pages/Admin/Blog/AdminBlog'));
const AdminSubscription = lazy(() => import('../pages/Admin/Subscription/AdminSubscription'));
const AdminProfile = lazy(() => import('../pages/Admin/AdminProfile/AdminProfile'));
const AddBlog = lazy(() => import('../pages/Common/BlogManage/AddBlog'));
const AddLawyer = lazy(() => import('../pages/Admin/LawyerList/AddLawyer'));
const CaseList = lazy(() => import('../pages/Admin/ListedCases/CaseList'));
const ScheduleList = lazy(() => import('../pages/Admin/ScheduleList/ScheduleList'));
const BlogManage = lazy(() => import('../pages/Common/BlogManage/BlogManage'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout/AdminLayout'));

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
            <Route path="subscription" element={<AdminSubscription />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="blog/add-blog" element={<AddBlog />} />
            <Route path="case-list" element={<CaseList />} />
            <Route path="self-blog" element={<AdminLayout selected="4"><BlogManage /></AdminLayout>} />
            <Route path="schedule-list" element={<ScheduleList />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AdminRoutes;
