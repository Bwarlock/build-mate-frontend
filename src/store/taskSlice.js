import { createSlice } from "@reduxjs/toolkit";

//Params is array , workaround to Redux-persist object being non serializable
const initialValue = {
	tableData: [],
	selectData: [],
	trashData: [],
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
	trashParams: [
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
		storeTaskTrash: (state, action) => {
			state.trashData = action.payload;
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
		setTaskTrashParams: (state, action) => {
			state.trashParams = [action.payload];
		},
		setTaskTrashTotal: (state, action) => {
			const total = action.payload;
			state.trashParams = [
				{
					...state.trashParams[0],
					pagination: {
						...state.trashParams[0].pagination,
						total: total,
					},
				},
			];
		},
		setTaskTotal: (state, action) => {
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
	storeTaskTrash,
	clearTask,
	taskLoading,
	setTaskTableParams,
	setTaskSelectParams,
	setTaskTrashParams,
	setTaskTrashTotal,
	setTaskTotal,
	updateTaskStore,
	deleteTaskStore,
} = taskSlice.actions;
export default taskSlice.reducer;
