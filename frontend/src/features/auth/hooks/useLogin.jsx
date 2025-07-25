import { useMutation } from "@tanstack/react-query";
import { login } from "../authSlice";
import { login as loginUser } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setRootFolderId } from "@/features/files/fileSlice";

const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (responseData) => {
			const { data, success, message } = responseData;
			if (success) {
				const { user } = data;
				dispatch(setRootFolderId(user?.rootFolder));
				dispatch(login(user));
				navigate("/");
				toast.success(message || "Login Successfull");
			}
		},
	});
};

export default useLogin;
