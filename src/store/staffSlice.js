import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
	tableData: [],
	selectData: [],
};

const staffSlice = createSlice({
	name: "staff",
	initialState: initialValue,
	reducers: {
		storeStaffTable: (state, action) => {
			console.log(action.payload);
			state.tableData = action.payload;
		},
		storeStaffSelect: (state, action) => {
			console.log(action.payload);
			state.selectData = action.payload;
		},
		clearStaff: (state) => {
			state.tableData = [];
			state.selectData = [];
		},
	},
});

export const { storeStaffTable, storeStaffSelect, clearStaff } =
	staffSlice.actions;
export default staffSlice.reducer;
