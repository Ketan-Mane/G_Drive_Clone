import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "../services/fileAPI";

const useCreateFolder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createFolder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
	});
};

export default useCreateFolder;
