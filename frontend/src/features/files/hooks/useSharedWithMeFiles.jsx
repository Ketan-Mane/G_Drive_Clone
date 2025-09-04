import { useQuery } from "@tanstack/react-query";
import React from "react";
import { sharedWithMe } from "../services/fileAPI";

const useSharedWithMeFiles = () => {
	return useQuery({
		queryKey: ["sharedWithMe"],
		queryFn: sharedWithMe,
	});
};

export default useSharedWithMeFiles;
