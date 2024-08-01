import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from '../../api/axiosInstance';

export interface UserState {
  loader: boolean;
  userDetail: Record<string, any>; // Replace with actual user detail structure if known
  error: string;
}

const initialState: UserState = {
  loader: false,
  userDetail: {},
  error: '',
};

// Define the type of the data returned by the API
type UserResponse = any; // Replace with actual response type if known

export const fetchUserAsync: AsyncThunk<UserResponse, void, {}> = createAsyncThunk<UserResponse, void>(
  'userData/fetchUser',
  async () => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.get(`${process.env.VITE_BASE_URL}/api/user/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.loader = true;
      state.error = '';
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      state.userDetail = action.payload;
      state.loader = false;
      state.error =''
    });
    builder.addCase(fetchUserAsync.rejected, (state) => {
      state.loader = false;
      state.error = 'Failed to fetch user data';
    });
  },
});

export default userDataSlice.reducer;
