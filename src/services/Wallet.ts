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