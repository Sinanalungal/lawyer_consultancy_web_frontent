// import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface LawyerState {
//   loader: boolean;
//   lawyers: any[];
// }

// const initialState: LawyerState = {
//   loader: false,
//   lawyers: [],
// };

// interface FetchLawyersParams {
//   selectedDepartment: string;
//   selectedExperience: string;
//   searchQuery: string;
// }

// export const fetchLawyersAsync: AsyncThunk<any, FetchLawyersParams, {}> = createAsyncThunk(
//   'lawyerData/fetchLawyers',
//   async (params: FetchLawyersParams) => {
//     const response = await axios.get(`${process.env.VITE_BASE_URL}/api/filter-lawyer/`, {
//       params: {
//         department_name: params.selectedDepartment,
//         experience: params.selectedExperience,
//         search_term: params.searchQuery,
//       },
//     });
//     return response.data;
//   }
// );

// const lawyerDataSlice = createSlice({
//   name: 'lawyerData',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchLawyersAsync.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(fetchLawyersAsync.fulfilled, (state, action: PayloadAction<any[]>) => {
//       state.lawyers = action.payload;
//       state.loader = false;
//     });
//     builder.addCase(fetchLawyersAsync.rejected, (state) => {
//       state.loader = false;
//     });
//   },
// });

// export default lawyerDataSlice.reducer;
