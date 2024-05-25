import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
};

const projectSlice = createSlice({
	name: "project",
	initialState: initialValue,
	reducers: {
		storeProjectTable: (state, action) => {
			state.tableData = action.payload;
		},
		storeProjectSelect: (state, action) => {
			state.selectData = action.payload;
		},
		clearProject: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
	},
});

export const { storeProjectTable, storeProjectSelect, clearProject } =
	projectSlice.actions;
export default projectSlice.reducer;
