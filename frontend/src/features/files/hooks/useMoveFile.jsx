import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFile } from "../services/fileAPI";

const useMoveFile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateFile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
	});
};

export default useMoveFile;
