import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slice/LoginActions';

const LawyerPrivateRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state: RootState) => state.login);
  const authTokens = localStorage.getItem('authTokens');

  useEffect(() => {
    if (!authTokens || !isAuthenticated) {
      dispatch(logout());
    }
  }, [authTokens, isAuthenticated, dispatch]);

  return isAuthenticated && role === 'lawyer' && authTokens ? <Outlet /> : <Navigate to="/" replace />;
};

export default LawyerPrivateRoute;
