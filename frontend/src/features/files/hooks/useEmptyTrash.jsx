import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllTrashFiles } from "../services/fileAPI";

const useEmptyTrash = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAllTrashFiles,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
			queryClient.invalidateQueries({ queryKey: ["sharedWithMe"] });
			queryClient.invalidateQueries({ queryKey: ["trashFiles"] });
		},
	});
};

export default useEmptyTrash;
