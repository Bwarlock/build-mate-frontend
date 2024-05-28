import { createSlice } from "@reduxjs/toolkit";

//Params is array , workaround to Redux-persist object being non serializable
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

const taskSlice = createSlice({
	name: "task",
	initialState: initialValue,
	reducers: {
		storeTaskTable: (state, action) => {
			state.tableData = action.payload;
		},
		storeTaskSelect: (state, action) => {
			state.selectData = action.payload;
		},
		clearTask: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
		taskLoading: (state, action) => {
			state.loading = action.payload;
		},
		setTaskTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
		setTaskSelectParams: (state, action) => {
			state.selectParams = [action.payload];
		},
	},
});

export const {
	storeTaskTable,
	storeTaskSelect,
	clearTask,
	taskLoading,
	setTaskTableParams,
	setTaskSelectParams,
} = taskSlice.actions;
export default taskSlice.reducer;
