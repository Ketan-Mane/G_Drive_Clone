import React from "react";
import useSharedWithMeFiles from "../../hooks/useSharedWithMeFiles";
import BreadCrumb from "../BreadCrumb";
import ContextMenuWrapper from "../ContextMenu/ContextMenuWrapper";
import SingleFile from "../File/SingleFile";
import SingleFolder from "../Folder/SingleFolder";

const SharedWithMe = () => {
	const { data: files } = useSharedWithMeFiles();

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-2xl font-semibold">Shared With Me</h1>
			<ContextMenuWrapper>
				<div className="flex min-h-[90vh] flex-col gap-3">
					<div className="grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
						{files?.map((file) => (
							<SingleFile key={file?._id} file={file} />
						))}
					</div>
				</div>
			</ContextMenuWrapper>
		</div>
	);
};

export default SharedWithMe;
