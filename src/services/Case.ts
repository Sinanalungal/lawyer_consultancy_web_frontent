import { getAxiosInstance } from "../api/axiosInstance";
import { SelectedCaseData } from "../types";

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


export const createSelectedCase = async (selectedCaseData: SelectedCaseData) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.post('/case-manage/selected-cases/', selectedCaseData);
    console.log('Selected case created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating selected case:', error.response?.data || error.message);
    throw error;
  }
};

export const getSelectedCasesByCaseId = async (caseId: number) => {
  console.log('this is calling');
  
  const axiosInstance = await getAxiosInstance();
  console.log(caseId,'this is the id');
  
  try {
    const response = await axiosInstance.get(`/case-manage/selected-cases/?case_id=${caseId}`);
    console.log('Selected cases for the given case ID:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching selected cases:', error.response?.data || error.message);
    throw error;
  }
};

interface AllotedCaseData {
  selected_case_id: number; 
  status?: string;  
}

export const createAllotedCase = async (allotedCaseData: AllotedCaseData) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.post('/case-manage/alloted-cases/create/', allotedCaseData);
    console.log('Alloted case created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating alloted case:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserAllotedCases = async (page: number = 1, searchTerm: string = '',status :string ='Ongoing') => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('/case-manage/alloted-cases/my-cases/', {
      params: {
        page,
        search: searchTerm,
        status:status,
      },
    });
    return {
      results: response.data.results,
      totalPages: Math.ceil(response.data.count / 2), 
    };
  } catch (error: any) {
    console.error('Error fetching user alloted cases:', error.response?.data || error.message);
    return { results: [], totalPages: 0 };
  }
};

export const CaseFinishedApi = async (caseId: number) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.patch(`/case-manage/approve-finished/${caseId}/`);
    console.log("Case finished:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in  applying finish:", error);
    throw error;
  }
};


export const getAllCases = async (
  page: number = 1,
  searchTerm: string = '',
  status: string = 'Ongoing'
) => {
  const axiosInstance = await getAxiosInstance();
  try {
    const response = await axiosInstance.get('/case-manage/alloted-cases/', {
      params: {
        page,
        search: searchTerm,
        status: status,
      },
    });

    return {
      results: response.data.results,
      totalPages: Math.ceil(response.data.count / 2),  
    };
  } catch (error: any) {
    console.error('Error fetching allotted cases:', error.response?.data || error.message);
    return { results: [], totalPages: 0 };
  }
};