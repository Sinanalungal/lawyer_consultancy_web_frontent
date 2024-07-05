import { useEffect, useState } from "react";
import { getAxiosInstance } from "../api/axiosInstance";

interface Department {
    id: number;
    department_name: string;
  }

export function useFetchDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(`${process.env.VITE_BASE_URL}/api/departments/`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }

    fetchDepartments();
  }, []);

  return { departments };
}
