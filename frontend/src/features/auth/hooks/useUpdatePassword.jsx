import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/authAPI";

const useUpdatePassword = () => {
	return useMutation({
		mutationFn: updatePassword,
	});
};

export default useUpdatePassword;
