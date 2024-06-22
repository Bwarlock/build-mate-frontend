import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	user: {},
};

const globalSlice = createSlice({
	name: "global",
	initialState: initialValue,
	reducers: {
		storeUser: (state, action) => {
			state.user = action.payload;
		},
		clearGlobal: (state) => {
			return { ...initialValue };
		},
	},
});

export const { storeUser, clearGlobal } = globalSlice.actions;
export default globalSlice.reducer;
