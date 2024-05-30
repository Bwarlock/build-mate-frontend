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
				pageSize: 20,
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
		clearStaff: () => {
			return { ...initialValue };
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
		setStaffTotal: (state, action) => {
			const total = action.payload;
			state.tableParams = [
				{
					...state.tableParams[0],
					pagination: {
						...state.tableParams[0].pagination,
						total: total,
					},
				},
			];
			state.selectParams = [
				{
					...state.selectParams[0],
					pagination: {
						...state.selectParams[0].pagination,
						total: total,
					},
				},
			];
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
	setStaffTotal,
} = staffSlice.actions;
export default staffSlice.reducer;
