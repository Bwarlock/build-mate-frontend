import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
	loading: false,
};

const taskSlice = createSlice({
	name: "task",
	initialState: initialValue,
	reducers: {
		storeTaskTable: (state, action) => {
			console.log(action.payload);
			state.tableData = action.payload;
		},
		storeTaskSelect: (state, action) => {
			console.log(action.payload);
			state.selectData = action.payload;
		},
		clearTask: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
		taskLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { storeTaskTable, storeTaskSelect, clearTask, taskLoading } =
	taskSlice.actions;
export default taskSlice.reducer;
