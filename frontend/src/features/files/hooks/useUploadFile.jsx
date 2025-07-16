import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../services/fileAPI";

const useUploadFile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: uploadFile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
	});
};

export default useUploadFile;
