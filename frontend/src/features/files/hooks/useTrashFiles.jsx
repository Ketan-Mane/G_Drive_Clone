import { useQuery } from "@tanstack/react-query";
import { getTrashedFiles } from "../services/fileAPI";
import { useSelector } from "react-redux";

const useTrashFiles = () => {
	const { rootFolderId } = useSelector((state) => state.file);
	return useQuery({
		queryKey: ["trashFiles", rootFolderId],
		queryFn: getTrashedFiles,
		refetchOnWindowFocus: false,
		enabled: Boolean(rootFolderId),
	});
};

export default useTrashFiles;
