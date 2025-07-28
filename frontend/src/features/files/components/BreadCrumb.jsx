import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	goToBreadcrumbLevel,
	setBreadcrumb,
	setCurrentFolderId,
} from "../fileSlice";
import clsx from "clsx";
import { ChevronRight, Folder } from "lucide-react";

const BreadCrumb = () => {
	const dispatch = useDispatch();
	const { breadcrumb, currentFolderId, rootFolderId } = useSelector(
		(state) => state.file,
	);

	return (
		<div className="flex items-center gap-2">
			<span
				onClick={() => {
					dispatch(setBreadcrumb([]));
					dispatch(setCurrentFolderId(rootFolderId));
				}}
				className={clsx("cursor-pointer font-semibold")}
			>
				{breadcrumb?.length === 0 ? "My Folder" : <Folder />}
			</span>
			{breadcrumb.map((menu, index) => (
				<div className="flex w-max items-center" key={menu?.id}>
					<ChevronRight size={18} />
					<span
						onClick={() => {
							dispatch(goToBreadcrumbLevel(index));
							dispatch(setCurrentFolderId(menu?.id));
						}}
						className={clsx(
							"cursor-pointer",
							menu.id === currentFolderId ? "font-semibold" : "",
						)}
					>
						{menu.name}
					</span>
				</div>
			))}
		</div>
	);
};

export default BreadCrumb;
