import React from "react";
import useTrashFiles from "../hooks/useTrashFiles";
import SingleTrashFile from "./Trash/SingleTrashFile";

const ListTrashFiles = () => {
	const { data: files } = useTrashFiles();

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-2xl font-bold">Bin</h1>

			<div className="w-full grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{files?.map((file) => (
					<SingleTrashFile file={file} key={file?._id} />
				))}
			</div>
		</div>
	);
};

export default ListTrashFiles;
