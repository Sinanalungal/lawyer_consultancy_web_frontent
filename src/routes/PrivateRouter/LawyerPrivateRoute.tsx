import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LoginState, logout } from '../../redux/slice/LoginActions';
import LawyerLayout from '../../layouts/LawyerLayout/LawyerLayout';

const LawyerPrivateRoute: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.login as LoginState
  );

  const authTokens = localStorage.getItem("authTokens");

  useEffect(() => {
    if (!authTokens && !isAuthenticated) {
      dispatch(logout());
      console.log('logged out worked');
      
      // navigate("/");
    }
  }, [authTokens, isAuthenticated]);

  return isAuthenticated && role === "lawyer" && authTokens ? (
    <LawyerLayout>
      <Outlet />
    </LawyerLayout>
  ) : (
    <Navigate to="/" replace />
  );
  // const dispatch = useDispatch();
  // const { isAuthenticated, role } = useSelector((state: RootState) => state.login);
  // const authTokens = localStorage.getItem('authTokens');

  // useEffect(() => {
  //   if (!authTokens || !isAuthenticated) {
  //     dispatch(logout());
  //   }
  // }, [authTokens, isAuthenticated, dispatch]);

  // return isAuthenticated && role === 'lawyer' && authTokens ? <Outlet /> : <Navigate to="/" replace />;
};

export default LawyerPrivateRoute;
