import { useQuery } from "@tanstack/react-query";
import { getFile } from "../services/fileAPI";

const useFile = ({ id }) => {
	return useQuery({
		queryKey: ["file", id],
		queryFn: () => getFile(id),
		refetchOnWindowFocus: false,
	});
};

export default useFile;
