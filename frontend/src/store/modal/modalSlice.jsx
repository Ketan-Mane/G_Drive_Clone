import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	modalType: null,
	modalProps: {},
	title: null,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.open = true;
			state.modalType = action.payload.modalType;
			state.modalProps = action.payload.modalProps;
			state.title = action.payload.title;
		},
		closeModal: (state) => {
			state.open = false;
			state.modalType = null;
			state.modalProps = {};
			state.title = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
