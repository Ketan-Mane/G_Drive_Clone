import React from "react";
import useFile from "../../hooks/useFile";
import { formatBytes, getFileCategory, stringToColor } from "@/lib/utils";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";

const FileDetails = ({ id }) => {
	const { data: file, isLoading } = useFile({ id });
	const { user } = useSelector((state) => state.auth);

	if (isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<Loader />
			</div>
		);
	}
	return (
		<div className="w-full flex flex-col gap-y-4 text-sm">
			<div className="flex flex-col">
				<span className="font-medium">Type</span>
				<span className="capitalize">{file?.isFolder ? " Folder" : getFileCategory(file?.type)}</span>
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
				<div className="flex gap-2 items-center">
					<span
						style={{ background: stringToColor(file?.owner?.email) }}
						className="w-7 h-7 rounded-full flex justify-center items-center text-white"
					>
						{user?.firstName?.charAt(0)}
					</span>
					<span>{file?.owner?.firstName + " " + file?.owner?.lastName}</span>
				</div>
			</div>
			{file?.sharedWith?.length > 0 && (
				<div className="flex gap-2 flex-col">
					<p className="font-medium">Who has access</p>
					{file?.sharedWith?.map((user) => (
						<div className="flex gap-2 items-center justify-between" key={user?._id}>
							<div className="flex gap-2 items-center">
								<span
									style={{ background: stringToColor(user?.email) }}
									className="w-7 h-7 rounded-full flex justify-center items-center text-white"
								>
									{user?.firstName?.charAt(0)}
								</span>
								<span>{user?.firstName + " " + user?.lastName}</span>
							</div>
						</div>
					))}
				</div>
			)}
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
