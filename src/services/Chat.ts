import { getAxiosInstance } from "../api/axiosInstance";

export const createOrGetThread = async (lawyerId:string) => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.post('chat/messages/', {
        lawyer_id: lawyerId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating or getting thread:", error);
      throw error;
    }
  };

export const fetchThreads = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.get('chat/messages/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching threads:", error);
      throw error;
    }
};

export const fetchThreadMessages = async (threadId:Number) => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.post('chat/messages/thread/', {
        thread_id: threadId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching thread messages:", error);
      throw error;
    }
  };