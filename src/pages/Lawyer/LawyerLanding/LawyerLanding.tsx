// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {  useNavigate } from "react-router-dom";
// import useRole from "../../../hooks/useRole";
// import { logout } from "../../../redux/slice/LoginActions";


// const LawyerLanding: React.FC = () => {
//   const { registered } = useSelector((state: any) => state.register);
//   const { isAuthenticated } = useSelector((store: any) => store.login);
//   const [lawyers, setLawyers] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const authTokens = localStorage.getItem("authTokens");
//   const role = useRole(authTokens);

//   useEffect(() => {
//     if (registered) {
//       navigate("/register");
//     }

//     if (isAuthenticated && role) {
//       handleRoleRedirect(role);
//     }

//     if (!isAuthenticated || !authTokens) {
//       dispatch(logout());
//     }

//     // fetchLawyerData();
//   },[dispatch, isAuthenticated, navigate, registered, authTokens, role]);


//   const handleRoleRedirect = (role: string) => {
//     switch (role) {
//       case "user":
//         navigate("/user");
//         break;
//       case "lawyer":
//         navigate("/lawyer");
//         break;
//       case "admin":
//         navigate("/admin");
//         break;
//       default:
//         break;
//     }
//   };

 

//   return (
//     <>
//       Dashboard comes here
     
//     </>
//   );
// };

// export default LawyerLanding;
