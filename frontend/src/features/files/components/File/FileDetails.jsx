import React from "react";
import useFile from "../../hooks/useFile";
import { formatBytes, getFileCategory } from "@/lib/utils";
import { useSelector } from "react-redux";

const FileDetails = ({ id }) => {
	const { data: file, isLoading } = useFile({ id });
	const { user } = useSelector((state) => state.auth);

	return (
		<div className="w-full flex flex-col gap-y-4 text-sm">
			<div className="flex flex-col">
				<span className="font-medium">Type</span>
				<span className="capitalize">
					{file?.isFolder ? " Folder" : getFileCategory(file?.type)}
				</span>
			</div>
			<div className="flex flex-col">
				<span className="font-medium">Size</span>
				<span>{formatBytes(file?.size)}</span>
			</div>
			<div className="flex flex-col">
				<span className="font-medium">Location</span>
				<span>{file?.parent?.name}</span>
			</div>
			<div className="flex flex-col">
				<span className="font-medium">Owner</span>
				<span>
					{file?.owner?._id === user?._id
						? "Me"
						: file?.owner?.firstName + " " + file?.owner?.lastName}
				</span>
			</div>
			<div className="flex flex-col">
				<span className="font-medium">Modified</span>
				<span>{new Date(file?.updatedAt).toLocaleString()}</span>
			</div>
			<div className="flex flex-col">
				<span className="font-medium">Created</span>
				<span>{new Date(file?.createdAt).toLocaleString()}</span>
			</div>
		</div>
	);
};

export default FileDetails;
