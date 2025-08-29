import React from "react";
import Folder from "@/assets/icons/folder.png";
import clsx from "clsx";
import TrashContextMenu from "../ContextMenu/TrashContextMenu";
import ContextMenuWrapper from "../ContextMenu/ContextMenuWrapper";

const SingleTrashFile = ({ file }) => {
	return (
		<ContextMenuWrapper>
			<div className="flex flex-col gap-2 rounded-md border bg-white p-2 transition-colors duration-300 hover:bg-gray-100">
				<img
					src={file?.isFolder ? Folder : file?.thumbnailUrl}
					alt={file?.name}
					className={clsx(
						"h-40 rounded mx-auto",
						file?.isFolder
							? "w-14 object-contain"
							: "w-full object-cover object-top",
					)}
				/>
				<p className="truncate font-semibold">{file.name}</p>
			</div>
			<TrashContextMenu file={file} />
		</ContextMenuWrapper>
	);
};

export default SingleTrashFile;
