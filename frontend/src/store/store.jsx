import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import modalReducer from "./modal/modalSlice";
import fileReducer from "@/features/files/fileSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		modal: modalReducer,
		file: fileReducer,
	},
});

export default store;
