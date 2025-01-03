import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useToast } from '../../components/Toast/ToastManager'; 
interface UserData {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
}

interface OtpData {
  email:string;
  otp: string;
}

interface ResendData {
  phone_number: string;
  email:string;
}

interface UserState {
  loading: boolean;
  registered: boolean;
  error: { message: string } | null;
  user: UserData | null;
  timer: any;
}

interface AsyncThunkConfig {
  rejectValue: {
    message: string;
  };
}

const getUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    try {
      return JSON.parse(userDataString) as UserData;
    } catch (error) {
      return null;
    }
  }
  return null;
};

const initialState: UserState = {
  loading: false,
  registered: false,
  error: null,
  user: getUserDataFromLocalStorage(),
  timer: 0,
};

export const registerUserAsync = createAsyncThunk<any, UserData, AsyncThunkConfig>(
  'user/registerUser',
  async (userData: UserData, { rejectWithValue }) => {
    console.log(userData);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register/`, userData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('userData', JSON.stringify(response.data.data));

      console.log(response.data);
      return response.data;
    } catch (error:any) {
      console.log(error);
      return rejectWithValue({ message: error.response.data?.email? error.response.data?.email?.[0] : error.response.data?.phone_number ?error.response.data?.phone_number?.[0] :'something went wrong' });
    }
  }
);

export const OtpVerification = createAsyncThunk<any, OtpData, AsyncThunkConfig>(
  'user/OtpVerification',
  async (OtpData: OtpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/otpvalidation/`, OtpData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('userData');
      }

      console.log(response.data);
      return response.data;
    } catch (error:any) {

      if (error.response.data.message){
        return rejectWithValue({ message: error.response.data.message });
      }else{
        return rejectWithValue({ message: 'Something Went Wrong' });
      }
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);

export const ResendOtp = createAsyncThunk<any, ResendData, AsyncThunkConfig>(
  'user/ResendOtp',
  async (ResendData: ResendData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/resendotp/`, ResendData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Use useToast hook to trigger your custom toast messages
      // const { addToast } = useToast();
      // if (response.status === 200) {
        
      // }

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error,'from async thunk');
      
      // const { addToast } = useToast();
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = true;
        state.error = null;
        state.timer = action.payload.timer;
        state.user = action.payload.data; 
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.registered = false;
        state.error = action.payload as { message: string } | null;
        state.user = null;
      })
      .addCase(OtpVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(OtpVerification.fulfilled, (state) => {
        state.loading = false;
        state.registered = false;
        state.error = null;
        state.user = null;
      })
      .addCase(OtpVerification.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ResendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.timer = action.payload.timer;
      })
      .addCase(ResendOtp.rejected, (state) => {
        state.loading = false;
        state.registered = false;
        state.error = null;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
export type { UserData, UserState };
