import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LoginState, logout } from "../../redux/slice/LoginActions";
import { SidebarDemo } from "../../layouts/LawyerLayout/SidebarComponentLawyer";

const LawyerPrivateRoute: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.login as LoginState
  );

  const authTokens = localStorage.getItem("authTokens");

  useEffect(() => {
    if (!authTokens && !isAuthenticated) {
      dispatch(logout());
      console.log("logged out worked");
    }
  }, [authTokens, isAuthenticated]);

  return isAuthenticated && role === "lawyer" && authTokens ? (
    <SidebarDemo>
      <Outlet />
    </SidebarDemo>
  ) : (
    <Navigate to="/" replace />
  );
};

export default LawyerPrivateRoute;
