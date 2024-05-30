import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	view: "table",
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
		storeProjectTrash: (state, action) => {
			state.trashData = action.payload;
		},
		clearProject: () => {
			return { ...initialValue };
		},
		projectLoading: (state, action) => {
			state.loading = action.payload;
		},
		setProjectTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
		setProjectSelectParams: (state, action) => {
			state.selectParams = [action.payload];
		},
		setProjectTrashParams: (state, action) => {
			state.trashParams = [action.payload];
		},
		setProjectTrashTotal: (state, action) => {
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
		setProjectTotal: (state, action) => {
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
		setProjectView: (state, action) => {
			state.view = action.payload;
		},
		deleteProjectStore: (state, action) => {
			const id = action.payload;
			state.tableData = state.tableData.filter((task) => task._id !== id);
			state.selectData = state.selectData.filter((task) => task.value !== id);
		},
	},
});

export const {
	storeProjectTable,
	storeProjectSelect,
	storeProjectTrash,
	clearProject,
	projectLoading,
	setProjectTableParams,
	setProjectSelectParams,
	setProjectTrashParams,
	setProjectTrashTotal,
	setProjectTotal,
	setProjectView,
	deleteProjectStore,
} = projectSlice.actions;
export default projectSlice.reducer;
