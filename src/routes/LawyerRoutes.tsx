import { Routes, Route } from 'react-router-dom';
import LawyerPrivateRoute from './PrivateRouter/LawyerPrivateRoute';
import Blog from '../pages/User/Blog/Blog';
import LawyerLanding from '../pages/Lawyer/LawyerLanding/LawyerLanding';
import LawyerSessionManage from '../pages/Lawyer/LawyerSession/LawyerSessionManage';
import BlogManage from '../pages/Common/BlogManage/BlogManage';
import AddBlog from '../pages/Common/BlogManage/AddBlog';
import LawyerAppointments from '../pages/Lawyer/LawyerAppointment/LawyerAppointments';
import LawyerProfile from '../pages/Lawyer/LawyerProfile/LawyerProfile';
import LawyerCaseManagement from '../pages/Lawyer/LawyerCasePage/LawyerCaseManage';
import AvailableCases from '../pages/Lawyer/LawyerCasePage/AvailableCases';
import LawyerWalletPage from '../pages/Lawyer/Wallet/Wallet';
import LawyerDashboard from '../pages/Lawyer/Dashboard/LawyerDashboard';



function LawyerRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        <Route path='' element={<LawyerDashboard />} />
        <Route path="profile" element={<LawyerProfile/>} />
        {/* <Route path="edit-profile" element={<EditProfilePage />} /> */}
        <Route path="blog" element={<Blog />} />
        <Route path="sessions" element={<LawyerSessionManage />} />
        <Route path="appointments" element={<LawyerAppointments />} />
        <Route path="cases" element={<LawyerCaseManagement/>} />
        <Route path="available-cases" element={<AvailableCases/>} />
        <Route path="self-blog" element={<BlogManage />} />
        <Route path="blog/add-blog" element={<AddBlog />} />
        <Route path="wallet" element={<LawyerWalletPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoutes