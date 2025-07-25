import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../services/fileAPI";
import { useSelector } from "react-redux";

const useFiles = () => {
	const { currentFolderId } = useSelector((state) => state.file);
	return useQuery({
		queryKey: ["files", currentFolderId],
		queryFn: () => getFiles(currentFolderId),
		refetchOnWindowFocus: false,
		enabled: Boolean(currentFolderId),
	});
};

export default useFiles;
