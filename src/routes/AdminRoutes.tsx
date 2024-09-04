import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './PrivateRouter/AdminPrivateRoute';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import LawyerList from '../pages/Admin/LawyerList/LawyerList';
import UserList from '../pages/Admin/UserList/UserList';
import AdminBlog from '../pages/Admin/Blog/AdminBlog';
import AdminSubscription from '../pages/Admin/Subscription/AdminSubscription';
import AdminProfile from '../pages/Admin/AdminProfile/AdminProfile';
import AddBlog from '../pages/Common/BlogManage/AddBlog';
import AddLawyer from '../pages/Admin/LawyerList/AddLawyer';
import CaseList from '../pages/Admin/ListedCases/CaseList';
import ScheduleList from '../pages/Admin/ScheduleList/ScheduleList';
import BlogManage from '../pages/Common/BlogManage/BlogManage';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';



function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<Dashboard/>} />
        <Route path="lawyers" element={<LawyerList/>} />
        <Route path="lawyers/add-lawyer" element={<AddLawyer/>} />
        <Route path="users" element={<UserList/>} />
        <Route path="blog" element={<AdminBlog/>} />
        <Route path="subscription" element={<AdminSubscription/>} />
        <Route path="profile" element={<AdminProfile/>} />
        <Route path="blog/add-blog" element={<AddBlog/>} />
        <Route path="case-list" element={<CaseList/>} />
        <Route path="self-blog" element={<AdminLayout selected='4'><BlogManage /></AdminLayout>} />
        <Route path="schedule-list" element={<ScheduleList/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes