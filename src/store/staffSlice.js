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
	selectParams: [
		{
			pagination: {
				current: 1,
				pageSize: 10,
				total: 200,
			},
		},
	],
};

const staffSlice = createSlice({
	name: "staff",
	initialState: initialValue,
	reducers: {
		storeStaffTable: (state, action) => {
			state.tableData = action.payload;
		},
		storeStaffSelect: (state, action) => {
			state.selectData = action.payload;
		},
		clearStaff: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
		staffLoading: (state, action) => {
			state.loading = action.payload;
		},
		setStaffTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
		setStaffSelectParams: (state, action) => {
			state.selectParams = [action.payload];
		},
	},
});

export const {
	storeStaffTable,
	storeStaffSelect,
	clearStaff,
	staffLoading,
	setStaffTableParams,
	setStaffSelectParams,
} = staffSlice.actions;
export default staffSlice.reducer;
