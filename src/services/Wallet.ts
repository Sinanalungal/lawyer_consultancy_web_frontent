import { getAxiosInstance } from "../api/axiosInstance";


export const addFunds = async (amount: number) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.post(
            'wallet/add-funds/',
            { amount },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const withdrawFunds = async (amount: number) => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.post(
            'wallet/withdraw-funds/',
            { amount },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const GetTheWallet = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('wallet/wallet-access/');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface WithdrawResponse {
    message: string; 
}

export const withdrawMoney = async (amount: number, upi_id: string): Promise<WithdrawResponse> => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.post<WithdrawResponse>('wallet/withdraw/', { amount, upi_id });
        return response.data;
    } catch (error: any) {
        console.error("Withdrawal Error: ", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const WithdrawalDataList = async (pageNum:number,status:string)=>{
    const axiosInstance  =  await getAxiosInstance()
    try{
        const response = await axiosInstance.get(`wallet/withdrawal-requests/?page=${pageNum}&status=${status}`)
        return response.data
    }catch (error: any) {
        console.error("Withdrawal Data List Error: ", error.response? error.response.data : error.message);
        throw error;
    }
}

// In services/Wallet.ts
export const updateWithdrawalStatus = async (id: number, status: string) => {
    const axiosInstance  =  await getAxiosInstance()
    try {
      const response = await axiosInstance.patch(`wallet/withdrawal-requests/${id}/`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
export const WalletBalanceApi = async () => {
    const axiosInstance = await getAxiosInstance();
    try {
        const response = await axiosInstance.get('wallet/wallet-balance-access/');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};