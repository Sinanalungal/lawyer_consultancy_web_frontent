import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slice/LoginActions";
import UserLayout from "../../layouts/UserLayout/UserLayout";

interface LoginState {
  isAuthenticated: boolean;
  role: string;
}

const UserPrivateRoute: React.FC = () => {
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

  return isAuthenticated && role === "user" && authTokens ? (
    <UserLayout>
      <Outlet />
    </UserLayout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserPrivateRoute;
