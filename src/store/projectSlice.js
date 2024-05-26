import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
	loading: false,
	tableParams: [
		{
			pagination: {
				current: 1,
				pageSize: 10,
				total: 200,
			},
		},
	],
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
		projectLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProjectTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
	},
});

export const {
	storeProjectTable,
	storeProjectSelect,
	clearProject,
	projectLoading,
	setProjectTableParams,
} = projectSlice.actions;
export default projectSlice.reducer;
