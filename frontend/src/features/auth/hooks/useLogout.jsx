import { useMutation } from "@tanstack/react-query";
import { logout } from "../authSlice";
import { logout as logoutUser } from "../services/authAPI";
import { useDispatch } from "react-redux";

const useLogout = () => {
	const dispatch = useDispatch();
	return useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			dispatch(logout());
			window.location.reload();
		},
	});
};

export default useLogout;
