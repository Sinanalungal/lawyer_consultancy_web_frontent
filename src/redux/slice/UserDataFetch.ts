import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { getAxiosInstance } from '../../api/axiosInstance';
// import { updateProfileImage } from '../../services/Blogs';

export interface UserState {
  loader: boolean;
  userDetail: Record<string, any>; 
  error: string;
}

const initialState: UserState = {
  loader: false,
  userDetail: {},
  error: '',
};


type UserResponse = any; 
type UpdateProfileImageResponse = any;
export const fetchUserAsync: AsyncThunk<UserResponse, void, {}> = createAsyncThunk<UserResponse, void>(
  'userData/fetchUser',
  async () => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/api/user/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
);

export const updateProfileImageAsync: AsyncThunk<UpdateProfileImageResponse, Blob | null, {}> = createAsyncThunk<UpdateProfileImageResponse, Blob | null>(
  'userData/updateProfileImage',
  async (profileImage, { rejectWithValue }) => {
    const axiosInstance = await getAxiosInstance();
    const formData = new FormData();
    
    if (profileImage) {
      formData.append('profile_image', profileImage, "image.png");
    } else {
      formData.append('profile_image', 'null');  
    }

    try {
      const response = await axiosInstance.patch('api/user/profile-image/', formData);
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("Error updating profile image:", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Error updating profile image');
    }
  }
);

export const updateUserDatas: AsyncThunk<any, string | null, {}> = createAsyncThunk<any, string | null>(
  'userData/updateUserDatas',
  async (full_name, { rejectWithValue }) => {
    const axiosInstance = await getAxiosInstance();
    const formData = new FormData();
    
    if (full_name) {
      formData.append('full_name', full_name);
      try {
        const response = await axiosInstance.patch('api/user/profile-image/', formData);
        console.log(response.data);
        return response.data;
      } catch (error: unknown) {
        console.error("Error updating user data:", error);
        return rejectWithValue("Error updating user data:");
      }
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
    builder.addCase(updateProfileImageAsync.pending, (state) => {
      state.loader = true;
      state.error = '';
    });
    builder.addCase(updateProfileImageAsync.fulfilled, (state, action: PayloadAction<UpdateProfileImageResponse>) => {
      // state.userDetail = { ...state.userDetail, profile_image: action.payload.profile_image };
      state.userDetail = action.payload;
      state.loader = false;
      state.error = '';
    });
    builder.addCase(updateProfileImageAsync.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateUserDatas.pending, (state) => {
      state.loader = true;
      state.error = '';
    });
    builder.addCase(updateUserDatas.fulfilled, (state, action: PayloadAction<UpdateProfileImageResponse>) => {
      // state.userDetail = { ...state.userDetail, profile_image: action.payload.profile_image };
      state.userDetail = action.payload;
      state.loader = false;
      state.error = '';
    });
    builder.addCase(updateUserDatas.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload as string;
    });
  },
});

export default userDataSlice.reducer;

