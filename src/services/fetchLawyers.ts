import { getAxiosInstance } from "../api/axiosInstance";
import { Lawyer, UserResponse } from "../types";

export const fetchLawyer = async (url: string, search: string, blocked: boolean) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get<UserResponse>(url, {
      params: {
        search: search,
        blocked: blocked.toString(), 
      },
    });
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// export const fetchUserSideLawyerList = async (url: string, search: string) => {
//   const axiosInstance = await getAxiosInstance();
//   try {
//     const response = await axiosInstance.get<UserResponse>(url, {
//       params: {
//         search: search,
//       },
//     });
//     console.log(response.data); 
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

export const fetchUserSideLawyerList = async (url: string, params: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get<{ count: number; results: Lawyer[] }>(url, {
      params: params
    });
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const updateLawyerVerification = async (userId: number, isVerified: boolean) => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.patch(`api/lawyer/update_verification/`, {
        user_id: userId,
        is_verified: isVerified,
      });
      console.log(response.data); 
      return response.data;
    } catch (error) {
      console.error("Error updating user verification status:", error);
      throw error;
    }
  };