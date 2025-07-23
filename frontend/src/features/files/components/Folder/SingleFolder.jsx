import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Folder } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useCallback } from "react";
import clsx from "clsx";

const SingleFolder = ({ folder }) => {
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
		<div
			ref={combinedRef}
			{...listeners}
			{...attributes}
			style={style}
			className={clsx(
				"flex gap-3 rounded-md border p-2 transition-colors duration-300 hover:bg-gray-100",
				isOver ? "bg-neutral-200" : "",
			)}
		>
			<Folder />
			<p className="font-semibold">{folder.name}</p>
		</div>
	);
};

export default SingleFolder;
