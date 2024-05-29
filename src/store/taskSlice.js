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
		clearTask: () => {
			return { ...initialValue };
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
		updateTaskStore: (state, action) => {
			const data = action.payload;
			state.tableData = state.tableData.map((task) => {
				if (task._id === data._id) {
					return data;
				}
				return task;
			});
			state.selectData = state.selectData.filter((task) => {
				if (task.value === data._id) {
					return {
						value: data._id,
						label: data.name,
					};
				}
				return task;
			});
		},
		deleteTaskStore: (state, action) => {
			const id = action.payload;
			state.tableData = state.tableData.filter((task) => task._id !== id);
			state.selectData = state.selectData.filter((task) => task.value !== id);
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
	updateTaskStore,
	deleteTaskStore,
} = taskSlice.actions;
export default taskSlice.reducer;
