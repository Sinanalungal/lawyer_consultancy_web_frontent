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

// export const cancelSchedule = async (uuid: string) => {
//     const axiosInstance = await getAxiosInstance();
//     try {
//         const response = await axiosInstance.patch(`schedule/cancel/${uuid}/`, {
//             is_canceled: true
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error canceling schedule with uuid ${uuid}:`, error);
//         throw error;
//     }
// };
export const cancelSchedule = async (value: number) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response =await axiosInstance.delete(`schedule/scheduled-session/${value}/delete/`);  
        return response.data;
    } catch (error) {
        console.error(`Error canceling schedule with uuid ${value}:`, error);
        throw error;
    }
};


export const getAvailableSchedulesForUser = async (date: string, lawyerId: number) => {
    const axiosInstance = await getAxiosInstance(); 
    try {
        const response = await axiosInstance.get('schedule/schedules/', {
            params: {
                date,
                lawyer_id: lawyerId
            }
        });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching available schedules:", error);
        throw error; 
    }
};


export const bookAppointment = async (schedulingUuid: string, selectedDate: string) => {
    const axiosInstance = await getAxiosInstance(); 
    try {
        const response = await axiosInstance.post('schedule/book-appointment/', {
            scheduling_uuid: schedulingUuid,
            scheduling_date: selectedDate,  // Include the selected date in the request payload
        });
        console.log("Appointment booked successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error; 
    }
};

export const bookAppointmentUsingWallet = async (schedulingUuid: string, selectedDate: string) => {
    const axiosInstance = await getAxiosInstance(); 
    try {
        const response = await axiosInstance.post('schedule/book-wallet-appointment/', {
            scheduling_uuid: schedulingUuid,
            scheduling_date: selectedDate,  
        });
        console.log("Appointment booked successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error; 
    }
};

export const bookAppointmentForWallet = async (schedulingUuid: string, selectedDate: string) => {
    const axiosInstance = await getAxiosInstance(); 
    try {
        const response = await axiosInstance.post('schedule/book-wallet-appointment/', {
            scheduling_uuid: schedulingUuid,
            scheduling_date: selectedDate, 
        });
        console.log("Appointment booked successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error; 
    }
};

export const fetchBookedSessions = async (tab: "upcoming" | "finished") => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('schedule/appointments/', {
            params: {
                type: tab, 
            },
        });
        console.log("Booked sessions retrieved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching booked sessions:", error);
        throw error;
    }
};

export const getSchedulesForAdminSide = async (pageNum: number, search: string, isListed: string | null) => {
    const axiosInstance = await getAxiosInstance();
    const params: any = {
      page: pageNum,
      search,
    };
  
    if (isListed !== null) {
      params.is_listed = isListed;
    }
  
    const response = await axiosInstance.get('/schedule/all-scheduling/', { params });
    return response.data;
  };
  
  export const updateSchedulingStatusAdmin = async (id: number, isListed: boolean) => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.patch(`/schedule/schedule/update/${id}/`, {
        is_listed: isListed,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating scheduling status:", error);
      throw error;
    }
  };

  export const cancelAppointment = async (uuid: string): Promise<any> => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.post(`/schedule/cancel-appointments/${uuid}/`);
      return response.data;
    } catch (error) {
      console.error("Error canceling the appointment:", error);
      throw error;
    }
  };
  
  export const ViewDetails = async (uuid: string): Promise<any> => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.get(`/schedule/details-of-appointment/${uuid}/`);
      return response.data;
    } catch (error) {
      console.error("Error canceling the appointment:", error);
      throw error;
    }
  };