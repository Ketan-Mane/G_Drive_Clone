import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Folder } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useCallback } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { pushToBreadcrumb, setCurrentFolderId } from "../../fileSlice";
import ContextMenuWrapper from "../ContextMenu/ContextMenuWrapper";
import FolderContextMenu from "../ContextMenu/FolderContextMenu";

const SingleFolder = ({ folder }) => {
	const dispatch = useDispatch();
	const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
		id: folder?._id,
		data: {
			file: folder,
		},
	});

	const {
		attributes,
		listeners,
		setNodeRef: setDraggableNodeRef,
		transform,
	} = useDraggable({
		id: folder?._id,
		data: {
			file: folder,
		},
	});

	const style = {
		transform: transform ? CSS.Translate.toString(transform) : undefined,
	};

	const combinedRef = useCallback(
		(node) => {
			setDraggableNodeRef(node);
			setDroppableNodeRef(node);
		},
		[setDraggableNodeRef, setDroppableNodeRef],
	);

	return (
		<ContextMenuWrapper>
			<div
				ref={combinedRef}
				{...listeners}
				{...attributes}
				style={style}
				className={clsx(
					"flex gap-3 rounded-md border p-4 transition-colors duration-300 hover:bg-gray-100 sm:p-2",
					isOver ? "bg-neutral-200" : "",
				)}
				// onClick={() => dispatch(setCurrentFolderId(folder?._id))}
				onClick={() => {
					dispatch(
						pushToBreadcrumb({
							id: folder?._id,
							name: folder?.name,
						}),
					);
					dispatch(setCurrentFolderId(folder?._id));
				}}
			>
				<Folder />
				<p className="font-semibold">{folder.name}</p>
			</div>
			<FolderContextMenu folder={folder} />
		</ContextMenuWrapper>
	);
};

export default SingleFolder;
