import axios, { AxiosInstance } from 'axios';
import AccessTokenManager from '../redux/slice/interceptor';
import { BASE_URL } from '../constants';

export const getAxiosInstance = async (): Promise<AxiosInstance> => {
  const authTokens = localStorage.getItem('authTokens');
  const parsedTokens = authTokens ? JSON.parse(authTokens) : null;

  const accessTokenManager = new AccessTokenManager(BASE_URL, parsedTokens);
  const axiosInstance = await accessTokenManager.createAxiosInstance();

  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
};
