
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useToast } from '../../components/Toast/ToastManager';

export interface LoginState {
  loader: boolean;
  isAuthenticated: boolean;
  error: string | null;
  role: string | null;
  dataRequired: boolean;
  value: number | null;
}

interface AsyncThunkConfig {
  rejectValue: {
    message: string;
  };
}

const initialState: LoginState = {
  loader: false,
  isAuthenticated: false,
  error: null,
  // user: null,
  role: null,
  dataRequired: false,
  value: null
};

export const GoogleLoginAsync = createAsyncThunk<{
  role: any;
  registering: any;
  id: any;
}, string, AsyncThunkConfig>(
  'login/GoogleLoginAsync',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.VITE_BASE_URL}/api/login-with-google/`, { code });
      var token = response.data.access_token;
      console.log(token);
      const registering = response?.data.registering;

      const tokens = { access: token.access, refresh: token.refresh };
      localStorage.setItem('authTokens', JSON.stringify(tokens));
      console.log(tokens);

      const { access } = token;

      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const { id, role } = decodedToken;

      return { role: role, registering: registering, id: id };
    } catch (error) {
      console.log(error);
      const { addToast } = useToast();
      addToast('danger', 'Something went wrong');
      return rejectWithValue({ message: 'Login failed' });
    }
  }
);

export const loginAsync = createAsyncThunk<{
  // data: any;
  role: any;
  registering: any;
  id: any;
}, {
  username: string;
  password: string;
}, AsyncThunkConfig>(
  'login/loginAsync',
  async (loginData: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.VITE_BASE_URL}/token/userdata/`, loginData);
      var token = response.data;
      console.log(token.access);

      const tokens = { access: token.access, refresh: token.refresh };
      localStorage.setItem('authTokens', JSON.stringify(tokens));

      const { access } = token;
      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const { id, role, registering } = decodedToken;
      console.log(registering, 'boolean');
      console.log('worked');
      return {  role: role, registering: registering, id: id };
    } catch (error) {
      console.log(error);
      const message = (error as any)?.response?.data || 'An unexpected error occurred';
      return rejectWithValue({ message });
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loaderManage(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;  
    }, 
    loginStart(state) {
      state.loader = true;
      state.isAuthenticated = false;
      state.error = null;
      // state.user = null;
    },
    // setAccess(state, value) {
    //   state.user = value;
    // },
    loginSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.loader = false;
      state.isAuthenticated = true;
      state.error = null;
      // state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loader = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      // state.user = null;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.error = null;
      // state.user = null;
      state.role = null;
      state.value = null;
      localStorage.removeItem('authTokens');
    },
    modaloff(state) {
      state.dataRequired = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = null;
        // state.user = action.payload.data;
        state.role = action.payload.role;
        state.dataRequired = action.payload.registering;
        state.value = action.payload.id;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action, 'this is the action');
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message as any;
        // state.user = null;
        state.role = null;
      })
      .addCase(GoogleLoginAsync.pending, (state) => {
        state.loader = true;
      })
      .addCase(GoogleLoginAsync.fulfilled, (state, action: PayloadAction<Record<string, any>>) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.error = null;
        // state.user = action.payload.data;
        state.role = action.payload.role;
        state.dataRequired = action.payload.registering;
        state.value = action.payload.id;
      })
      .addCase(GoogleLoginAsync.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.error = action.payload as any;
        // state.user = null;
        state.role = null;
      });
  },
});

export const {loaderManage, loginStart, loginSuccess, loginFailure, logout, modaloff } = loginSlice.actions;
export default loginSlice.reducer;
