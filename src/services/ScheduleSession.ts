import { getAxiosInstance } from "../api/axiosInstance";

export const addSchedule = async (formData: FormData) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.post('schedule/add-schedule/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
    }
};



export const getSchedules = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('schedule/user-sessions/');
        return response.data;
    } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
    }
};



export const getActiveSchedules = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('schedule/user-sessions/', {
            params: {
                is_canceled: false,
                is_completed: false,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching active schedules:", error);
        throw error;
    }
};

export const cancelSchedule = async (uuid: string) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.patch(`schedule/cancel/${uuid}/`, {
            is_canceled: true
        });
        return response.data;
    } catch (error) {
        console.error(`Error canceling schedule with uuid ${uuid}:`, error);
        throw error;
    }
};