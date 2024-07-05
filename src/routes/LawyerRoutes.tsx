import { Routes, Route } from 'react-router-dom';
import LawyerPrivateRoute from './PrivateRouter/LawyerPrivateRoute';



function LawyerRoutes() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoutes