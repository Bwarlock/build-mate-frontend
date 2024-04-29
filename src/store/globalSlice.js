import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	user: {},
};

const globalSlice = createSlice({
	name: "global",
	initialState: initialValue,
	reducers: {
		storeUser: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;
		},
		clearGlobal: (state) => {
			state.user = {};
		},
	},
});

export const { storeUser, clearGlobal } = globalSlice.actions;
export default globalSlice.reducer;
