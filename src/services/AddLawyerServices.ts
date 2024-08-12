import { getAxiosInstance } from "../api/axiosInstance";

export const fetchDepartmentsAndLanguages = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.get('/api/departments-languages/');
      return response.data;
    } catch (error) {
      console.error("Error fetching departments and languages:", error);
      throw error;
    }
};




export const addLawyer = async (formData: FormData) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.post('/adminside/add-lawyer/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding lawyer:", error);
        throw error;
    }
};