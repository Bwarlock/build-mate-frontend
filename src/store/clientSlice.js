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
		clientLoading: (state, action) => {
			state.loading = action.payload;
		},
		setClientTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
	},
});

export const {
	storeClientTable,
	storeClientSelect,
	clearClient,
	clientLoading,
	setClientTableParams,
} = clientSlice.actions;
export default clientSlice.reducer;
