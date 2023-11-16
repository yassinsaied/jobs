import { createSlice } from '@reduxjs/toolkit';
import { myProfileAction, allProfilesActions, updateManyProfilesActions } from '../actions/profileAction';

const initialState = {
  currentProfile: {},
  allProfile: [],
  loading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateAgGridData: (state, action) => {
      // console.log('sssssssssssssss', action.payload);
      state.allProfile = action.payload;
    },

    updateCellData: (state, action) => {
      const { rowIndex, colId, newValue } = action.payload;
      // Create a new object and update the value using the spread operator
      state.allProfile = state.allProfile.map((row, index) =>
        index === rowIndex ? { ...row, [colId]: newValue } : row
      );
    },
  },
  extraReducers: (builder) => {
    // Get My Profile
    builder
      .addCase(myProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(myProfileAction.fulfilled, (state, action) => {
        state.loading = false;

        state.currentProfile = action.payload;
      })
      .addCase(myProfileAction.rejected, (state) => {
        state.loading = false;
      });

    // Get All Profiles
    builder
      .addCase(allProfilesActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProfilesActions.fulfilled, (state, action) => {
        state.loading = false;
        state.allProfile = action.payload;
      })
      .addCase(allProfilesActions.rejected, (state) => {
        state.loading = false;
      });

    // update Agride

    // Get All Profiles
    builder
      .addCase(updateManyProfilesActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateManyProfilesActions.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(updateManyProfilesActions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateAgGridData, updateCellData } = profileSlice.actions;
export default profileSlice.reducer;
