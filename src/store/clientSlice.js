import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
};

const clientSlice = createSlice({
	name: "client",
	initialState: initialValue,
	reducers: {
		storeClientTable: (state, action) => {
			console.log(action.payload);
			state.tableData = action.payload;
		},
		storeClientSelect: (state, action) => {
			console.log(action.payload);
			state.selectData = action.payload;
		},
		clearClient: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
	},
});

export const { storeClientTable, storeClientSelect, clearClient } =
	clientSlice.actions;
export default clientSlice.reducer;
