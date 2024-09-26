import { getAxiosInstance } from "../api/axiosInstance";

export const getUserNotifications = async (page: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(`notification/recent-notifications/?page=${page}`); // Adjust the endpoint as necessary
    return response.data;
  } catch (error) {
    throw error;
  }
};
