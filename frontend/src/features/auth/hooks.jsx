import { useMutation } from "@tanstack/react-query";
import { login, loginVerify, logout, register } from "./authAPI";
import toast from "react-hot-toast";

const useRegister = () => {
	return useMutation({
		mutationFn: register
	});
};

const useLogin = () => {
	return useMutation({
		mutationFn: login,
	});
};

const useLoginVerify = () => {
	return useMutation({
		mutationFn: loginVerify,
	});
};

const useLogout = () => {
	return useMutation({ mutationFn: logout });
};

export { useRegister, useLogin, useLoginVerify, useLogout };
