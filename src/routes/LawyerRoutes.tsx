import { Routes, Route } from 'react-router-dom';
import LawyerPrivateRoute from './PrivateRouter/LawyerPrivateRoute';
import Profile from '../pages/User/Profile/Profile';
import EditProfilePage from '../pages/User/Profile/EditProfile';
import Blog from '../pages/User/Blog/Blog';
import LawyerLanding from '../pages/Lawyer/LawyerLanding/LawyerLanding';
import LawyerSessionManage from '../pages/Lawyer/LawyerSession/LawyerSessionManage';
import BlogManage from '../pages/Common/BlogManage/BlogManage';
import AddBlog from '../pages/Common/BlogManage/AddBlog';



function LawyerRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        <Route path='' element={<LawyerLanding />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
        <Route path="blog" element={<Blog />} />
        <Route path="sessions" element={<LawyerSessionManage />} />
        <Route path="self-blog" element={<BlogManage />} />
        <Route path="blog/add-blog" element={<AddBlog />} />
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoutes