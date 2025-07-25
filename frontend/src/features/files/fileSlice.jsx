import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	rootFolderId: null,
	currentFolderId: null,
};

const fileSlice = createSlice({
	name: "file",
	initialState,
	reducers: {
		setRootFolderId: (state, action) => {
			state.rootFolderId = action.payload;
			state.currentFolderId = action.payload;
		},
		setCurrentFolderId: (state, action) => {
			state.currentFolderId = action.payload;
		},
	},
});

export const { setRootFolderId, setCurrentFolderId } = fileSlice.actions;
export default fileSlice.reducer;
