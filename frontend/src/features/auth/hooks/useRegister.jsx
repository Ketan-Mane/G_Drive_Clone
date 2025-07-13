import { useMutation } from "@tanstack/react-query";
import { register } from "../services/authAPI";

const useRegister = () => {
	return useMutation({
		mutationFn: register,
	});
};

export default useRegister;
