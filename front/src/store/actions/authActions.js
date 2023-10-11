import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../services/authService';

export const loginAction = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginService(credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});
