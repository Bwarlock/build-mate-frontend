import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	view: "card",
	tableData: [],
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

const documentSlice = createSlice({
	name: "document",
	initialState: initialValue,
	reducers: {
		storeDocumentTable: (state, action) => {
			state.tableData = action.payload;
		},
		clearDocument: () => {
			return { ...initialValue };
		},
		documentLoading: (state, action) => {
			state.loading = action.payload;
		},
		setDocumentTableParams: (state, action) => {
			state.tableParams = [action.payload];
		},
		setDocumentTotal: (state, action) => {
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
		},
		setDocumentView: (state, action) => {
			state.view = action.payload;
		},
	},
});

export const {
	storeDocumentTable,
	clearDocument,
	documentLoading,
	setDocumentTableParams,
	setDocumentTotal,
	setDocumentView,
} = documentSlice.actions;
export default documentSlice.reducer;
