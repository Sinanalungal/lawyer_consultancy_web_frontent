import { getAxiosInstance } from "../api/axiosInstance";
import { format } from 'date-fns';

export const GetSalesReport = async (fromDate:Date|null,toDate:Date|null,searchTerm:string,currentPage:number,itemsPerPage:number =2) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('schedule/successfull-appointments/',{
            params: {
                from_date: fromDate ? format(fromDate, 'yyyy-MM-dd') : null,
                to_date: toDate ? format(toDate, 'yyyy-MM-dd') : null,
                search: searchTerm,
                page: currentPage,
                per_page: itemsPerPage,
              },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const GetPdfData= async (fromDate:Date|null,toDate:Date|null,searchTerm:string,currentPage:number,itemsPerPage:number =2) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('schedule/pdf-downloading-data/',{
            params: {
                from_date: fromDate ? format(fromDate, 'yyyy-MM-dd') : null,
                to_date: toDate ? format(toDate, 'yyyy-MM-dd') : null,
                search: searchTerm,
                page: currentPage,
                per_page: itemsPerPage,
              },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
