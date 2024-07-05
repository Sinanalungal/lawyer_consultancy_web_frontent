import axios from "axios";

export const fetchLawyerList = async () => {
  try {
    const response = await axios.get(`${process.env.VITE_BASE_URL}/api/lawyer-list/`);
    console.log(response); 
    return response.data;
  } catch (error) {
    console.error("Error fetching lawyer list:", error);
    throw error;
  }
};
