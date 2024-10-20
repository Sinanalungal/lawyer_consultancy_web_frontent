import { AxiosInstance } from 'axios';
import AccessTokenManager from '../redux/slice/interceptor';

export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  const authTokens = localStorage.getItem('authTokens');
  // console.log(authTokens,'this is the auth token from axios instance');
  const parsedTokens = authTokens ? JSON.parse(authTokens) : null;

  const accessTokenManager = new AccessTokenManager(import.meta.env.VITE_BASE_URL, parsedTokens);
  const axiosInstance = await accessTokenManager.createAxiosInstance();

  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
};
