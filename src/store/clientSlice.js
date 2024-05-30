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

const clientSlice = createSlice({
	name: "client",
	initialState: initialValue,
	reducers: {
		storeClientTable: (state, action) => {
			state.tableData = action.payload;
		},
		storeClientSelect: (state, action) => {
			state.selectData = action.payload;
		},
		clearClient: () => {
			return { ...initialValue };
		},
		clientLoading: (state, action) => {
			state.loading = action.payload;
		},
		setClientTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
		setClientSelectParams: (state, action) => {
			state.selectParams = [action.payload];
		},
		setClientTotal: (state, action) => {
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
	storeClientTable,
	storeClientSelect,
	clearClient,
	clientLoading,
	setClientTableParams,
	setClientSelectParams,
	setClientTotal,
} = clientSlice.actions;
export default clientSlice.reducer;
