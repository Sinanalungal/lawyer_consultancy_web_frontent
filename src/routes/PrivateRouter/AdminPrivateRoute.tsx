import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slice/LoginActions';
import { SidebarDemoAdmin } from '../../layouts/AdminLayout/SidebarComponentAdmin';

const AdminPrivateRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state: RootState) => state.login);
  const authTokens = localStorage.getItem('authTokens');

  useEffect(() => {
    if (!authTokens || !isAuthenticated) {
      dispatch(logout());
    }
  }, [authTokens, isAuthenticated, dispatch]);

  return isAuthenticated && role === 'admin' && authTokens ?<SidebarDemoAdmin><Outlet /> </SidebarDemoAdmin> : <Navigate to="/" replace />;
};

export default AdminPrivateRoute;
