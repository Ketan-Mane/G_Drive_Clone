import React from "react";
import useSharedWithMeFiles from "../../hooks/useSharedWithMeFiles";
import BreadCrumb from "../BreadCrumb";
import ContextMenuWrapper from "../ContextMenu/ContextMenuWrapper";
import SingleFile from "../File/SingleFile";
import SharedWithMeIcon from "@/assets/empty_state_shared_with_me.svg";

const SharedWithMe = () => {
	const { data: files } = useSharedWithMeFiles();

	return (
		<div className="flex flex-col gap-y-2">
			<h1 className="text-2xl font-semibold">Shared With Me</h1>
			<ContextMenuWrapper>
				<div className="flex min-h-[90vh] flex-col gap-3">
					{files?.length > 0 ? (
						<>
							<BreadCrumb rootFolder="Shared with me" />
							<div className="grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
								{files?.map((file) => (
									<SingleFile key={file?._id} file={file} />
								))}
							</div>
						</>
					) : (
						<div className="flex flex-col items-center my-auto select-none">
							<img src={SharedWithMeIcon} alt="Shared With Me" className="w-40" />
							<span className="text-lg font-semibold text-neutral-600">
								No shared items yet. Files and folders shared with you will show up here.
							</span>
						</div>
					)}
				</div>
			</ContextMenuWrapper>
		</div>
	);
};

export default SharedWithMe;
