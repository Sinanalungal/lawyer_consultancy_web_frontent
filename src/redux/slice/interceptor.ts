import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useToast } from '../../components/Toast/ToastManager';

class AccessTokenManager {
  private readonly baseUrl: string;
  private user: any;

  constructor(baseUrl: string, user: any) {
    this.baseUrl = baseUrl;
    this.user = user;
  }

  private async getAccessToken(): Promise<string | undefined> {
    try {
      console.log('getting token...');
      return this.user.access;
    } catch {
      console.log('log is working');
      window.location.reload();
    }
  }

  private async refreshToken(): Promise<void> {
    console.log('refreshing token...');
    const refreshToken = this.user.refresh;
    const response = await axios.post(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken });
    console.log(response, 'refreshtoken response');

    console.log(response.data, 'new token gets ');
    const token = response.data;
    const tokens = { access: token.access, refresh: token.refresh };
    localStorage.setItem('authTokens', JSON.stringify(tokens));
    this.user.access = response.data.access;
  }

  private isAccessTokenExpired(): boolean {
    console.log('token checking...');
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000;
    return Date.now() >= exp;
  }

  public async createAxiosInstance(): Promise<AxiosInstance> {
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });

    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = await this.getAccessToken();
        console.log(accessToken);
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        if (this.isAccessTokenExpired() || Date.now() + 20000 >= this.getExpirationTime()) {
          try {
            await this.refreshToken();
          } catch {
            console.log('catch block is working');
            localStorage.removeItem('authTokens');
            window.location.reload();
            const { addToast } = useToast();
            addToast('danger', 'OTP Timeout, please resend OTP.');
          }
        }

        config.headers = config.headers || {};

        config.headers.Authorization = `Bearer ${this.user.access}`;
        console.log('axios is ok');
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }

  private getExpirationTime(): number {
    console.log('expiration time checking...');
    const token = this.user.access;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const exp = decodedToken.exp * 1000;
    console.log(exp);
    return exp;
  }
}

export default AccessTokenManager;
