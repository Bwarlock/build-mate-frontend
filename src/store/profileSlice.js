import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	profileData: {},
	loading: false,
};

const profileSlice = createSlice({
	name: "profile",
	initialState: initialValue,
	reducers: {
		storeProfileData: (state, action) => {
			state.profileData = action.payload;
		},
		clearProfile: (state) => {
			return { ...initialValue };
		},
		profileLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { storeProfileData, clearProfile, profileLoading } =
	profileSlice.actions;
export default profileSlice.reducer;
