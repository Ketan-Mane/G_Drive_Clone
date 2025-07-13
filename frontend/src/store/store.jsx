import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import modalReducer from "./modal/modalSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		modal: modalReducer,
	},
});

export default store;
