import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteFile } from "../services/fileAPI";

const useDeleteFile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteFile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trashFiles"] });
		},
	});
};

export default useDeleteFile;
