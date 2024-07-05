import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './PrivateRouter/AdminPrivateRoute';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';



function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<Dashboard/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoutes