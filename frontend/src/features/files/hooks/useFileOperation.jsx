import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { copyOrMoveFile } from "../services/fileAPI";

const useFileOperation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: copyOrMoveFile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
	});
};

export default useFileOperation;
