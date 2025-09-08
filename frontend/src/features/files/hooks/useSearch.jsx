import { useQuery } from "@tanstack/react-query";
import React from "react";
import { searchFiles } from "../services/fileAPI";

const useSearch = ({ search = "", type = "all" }) => {
	return useQuery({
		queryKey: ["search", { search, type }],
		queryFn: searchFiles,
		enabled: !!search || type !== "all", // only fire when searching/filtering
		refetchOnWindowFocus: false,
	});
};

export default useSearch;
