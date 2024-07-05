// import { useEffect, useState } from "react";
// import { getAxiosInstance } from "../api/axiosInstance";

// interface UseFetchLawyersProps {
//   selectedDepartment?: string;
//   selectedExperience?: string;
//   searchQuery?: string;
// }

// interface Lawyer {
//   id: number;
//   full_name: string;
//   profile: string;
//   experience: number;
//   departments: Department[];
//   description: string;
// }

// interface Department {
//   id: number;
//   department_name: string;
// }
  
// export function useFetchLawyers({
//   selectedDepartment,
//   selectedExperience,
//   searchQuery,
// }: UseFetchLawyersProps = {}) {
//   const [lawyers, setLawyers] = useState<Lawyer[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchLawyers() {
//       try {
//         setLoading(true);
//         const axiosInstance = await getAxiosInstance();
//         const response = await axiosInstance.get(`${process.env.VITE_BASE_URL}/api/filter-lawyer/`, {
//           params: {
//             department_name: selectedDepartment,
//             experience: selectedExperience,
//             search_term: searchQuery,
//           },
//         });
//         setLawyers(response.data);
//         console.log(response.data)
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching lawyers:", error);
//         setLoading(false);
//       }
//     }

//     if (selectedDepartment || selectedExperience || searchQuery) {
//       fetchLawyers();
//     } else {
//       setLoading(false); // No need to fetch if no criteria provided
//     }
//   }, [selectedDepartment, selectedExperience, searchQuery]);

//   return { lawyers, loading };
// }
