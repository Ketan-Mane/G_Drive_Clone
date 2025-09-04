import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { shareFile } from "../services/fileAPI";

const useShareFile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: shareFile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["files"] });
			queryClient.invalidateQueries({ queryKey: ["file"] });
		},
	});
};

export default useShareFile;
