import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateUser } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";

const useUpdateUser = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: updateUser,
		onSuccess: (user) => {
			dispatch(setUser(user));
		},
	});
};

export default useUpdateUser;
