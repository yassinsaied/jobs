import { createAsyncThunk } from '@reduxjs/toolkit';
import { myProfileService, allProfileService, updateManyProfilesService } from '../../services/profileService';

export const myProfileAction = createAsyncThunk('profile/myprofile', async (rejectWithValue) => {
  try {
    const response = await myProfileService();

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

export const allProfilesActions = createAsyncThunk('profile/allprofiles', async (rejectWithValue) => {
  try {
    const response = await allProfileService();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateManyProfilesActions = createAsyncThunk(
  'profile/updatemanyprofiles',
  async (profilesToUpdates, { rejectWithValue }) => {
    try {
      const response = await updateManyProfilesService(profilesToUpdates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
