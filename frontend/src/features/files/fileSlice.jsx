import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	rootFolderId: null,
	currentFolderId: null,
	breadcrumb: [],
	clipboard: null,
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
		setBreadcrumb: (state, action) => {
			state.breadcrumb = [];
		},
		pushToBreadcrumb: (state, action) => {
			state.breadcrumb.push(action.payload);
		},
		goToBreadcrumbLevel: (state, action) => {
			state.breadcrumb = state.breadcrumb.slice(0, action.payload + 1);
		},
		setClipboard: (state, action) => {
			state.clipboard = action.payload;
		},
		clearClipboard: (state, action) => {
			state.clipboard = null;
		},
	},
});

export const {
	setRootFolderId,
	setCurrentFolderId,
	setBreadcrumb,
	pushToBreadcrumb,
	goToBreadcrumbLevel,
	setClipboard,
	clearClipboard,
} = fileSlice.actions;
export default fileSlice.reducer;
