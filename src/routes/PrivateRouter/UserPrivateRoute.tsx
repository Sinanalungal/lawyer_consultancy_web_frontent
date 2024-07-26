import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slice/LoginActions";

interface LoginState {
  isAuthenticated: boolean;
  role: string;
}

const UserPrivateRoute: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.login as LoginState
  );

  const authTokens = localStorage.getItem("authTokens");

  useEffect(() => {
    if (!authTokens || !isAuthenticated) {
      dispatch(logout());
      navigate("/");
    }
  }, [authTokens, isAuthenticated, dispatch, navigate]);

  return isAuthenticated && role === "user" && authTokens ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserPrivateRoute;
