import { getAxiosInstance } from "../api/axiosInstance";

// Fetch cases
export const fetchCases = async (page = 1) => {
    const axiosInstance = await getAxiosInstance();
    try {
      const response = await axiosInstance.get(`/case-manage/cases/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cases:', error);
      throw error;
    }
  };
  

// Fetch case details
export const fetchCaseDetails = async (caseId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get(`/case-manage/cases/${caseId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching case details:', error);
    throw error;
  }
};

// Submit a new case
export const submitCase = async (caseData: { case_type: string, description: string, budget: number, reference_until: string }) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.post('/case-manage/cases/', caseData);
    return response.data;
  } catch (error) {
    console.error('Error submitting case:', error);
    throw error;
  }
};

export const fetchStates = async () => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('/case-manage/states/');
    console.log(response.data,'states');
    return response.data; 
    
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

export const fetchCasesForLawyer = async (page: number, searchTerm: string, selectedState: string, status: string) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('/case-manage/case-for-lawyers/', {
      params: {
        page,
        search: searchTerm,
        state: selectedState,
        status: status,
      },
    });
    return {
      results: response.data.results,
      totalPages: Math.ceil(response.data.count / 2), // Ensure you have 'count' in response
    };
  } catch (error) {
    console.error('Error fetching cases:', error);
    return { results: [], totalPages: 0 };
  }
};

export const deleteCase = async (caseId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.delete(`/case-manage/cases-manage/${caseId}/unlist/`);
    console.log("Case deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting case:", error);
    throw error;
  }
};