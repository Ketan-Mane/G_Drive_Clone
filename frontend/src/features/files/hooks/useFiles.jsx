import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../services/fileAPI";

const useFiles = () => {
	return useQuery({
		queryKey: ["files"],
		queryFn: getFiles,
		refetchOnWindowFocus: false,
	});
};

export default useFiles;
