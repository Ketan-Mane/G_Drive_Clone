import React from "react";
import useTrashFiles from "../hooks/useTrashFiles";
import SingleTrashFile from "./Trash/SingleTrashFile";
import EmptyIcon from "@/assets/empty_state_trash.svg";

const ListTrashFiles = () => {
	const { data: files } = useTrashFiles();

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-2xl font-bold">Bin</h1>

			<div className="w-full grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{files?.length > 0 ? (
					files?.map((file) => <SingleTrashFile file={file} key={file?._id} />)
				) : (
					<div className="flex col-span-4 mt-[30vh] flex-col items-center my-auto select-none">
						<img src={EmptyIcon} alt="Trash icons" className="w-40" />
						<span className="text-lg font-semibold text-neutral-600">
							Your bin is empty. Nothing to clean up here 🧹
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ListTrashFiles;
