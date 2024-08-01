import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './PrivateRouter/AdminPrivateRoute';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import LawyerList from '../pages/Admin/LawyerList/LawyerList';
import UserList from '../pages/Admin/UserList/UserList';
import AdminBlog from '../pages/Admin/Blog/AdminBlog';
import AdminSubscription from '../pages/Admin/Subscription/AdminSubscription';
import AdminProfile from '../pages/Admin/AdminProfile/AdminProfile';
import AddBlog from '../pages/Admin/Blog/AddBlog';



function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<Dashboard/>} />
        <Route path="lawyers" element={<LawyerList/>} />
        <Route path="users" element={<UserList/>} />
        <Route path="blog" element={<AdminBlog/>} />
        <Route path="subscription" element={<AdminSubscription/>} />
        <Route path="profile" element={<AdminProfile/>} />
        <Route path="blog/add-blog" element={<AddBlog/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes