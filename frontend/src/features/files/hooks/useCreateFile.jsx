import { useMutation } from "@tanstack/react-query";
import { createFile } from "../services/fileAPI";

const useCreateFile = () => {
	return useMutation({
		mutationFn: createFile,
	});
};

export default useCreateFile;
