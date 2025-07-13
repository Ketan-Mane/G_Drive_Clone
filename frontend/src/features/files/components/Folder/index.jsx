import React from "react";
import useFiles from "../../hooks/useFiles";
import SingleFolder from "./SingleFolder";

const Folders = () => {
	const { data } = useFiles();

	const folders = data?.filter((item) => item?.isFolder) || [];
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 cursor-default">
			{folders?.map((folder) => (
				<SingleFolder folder={folder} />
			))}
		</div>
	);
};

export default Folders;
