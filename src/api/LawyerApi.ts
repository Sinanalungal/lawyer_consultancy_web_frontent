// import { getAxiosInstance } from './axiosInstance';

// interface FetchLawyersParams {
//   selectedDepartment?: string;
//   selectedExperience?: string;
//   searchQuery?: string;
// }

// export const fetchLawyers = async ({
//   selectedDepartment,
//   selectedExperience,
//   searchQuery,
// }: FetchLawyersParams = {}) => {
//   const axiosInstance = await getAxiosInstance();
//   const response = await axiosInstance.get('/api/filter-lawyer/', {
//     params: {
//       department_name: selectedDepartment,
//       experience: selectedExperience,
//       search_term: searchQuery,
//     },
//   });
//   return response.data;
// };
