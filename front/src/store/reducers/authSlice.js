import { createSlice } from '@reduxjs/toolkit';
import { loginAction } from '../actions/authActions';

const initialState = {
  isLogged: false,
  loading: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogged = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
