import { getAxiosInstance } from "../api/axiosInstance";

export const FetchTheUserAndLawyerGrowth = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.get('dashboard/admin-dashboard/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching userGrowth:", error);
      throw error;
    }
  };

export const LawyerDashboardFunctionalities = async () => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('dashboard/lawyer-dashboard/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching userGrowth:", error);
    throw error;
  }
};