import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
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
	},
});

export const { storeTaskTable, storeTaskSelect, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
