import { formatBytes } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ContextMenuWrapper from "../ContextMenu/ContextMenuWrapper";
import FileContextMenu from "../ContextMenu/FileContextMenu";

const SingleFile = ({ file }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: file?._id,
		data: {
			file,
		},
	});
	const style = {
		transform: transform ? CSS.Translate.toString(transform) : undefined,
	};

	return (
		<ContextMenuWrapper>
			<div
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				style={style}
				className="flex flex-col gap-2 rounded-md border bg-white p-2 transition-colors duration-300 hover:bg-gray-100"
			>
				<img
					src={file?.thumbnailUrl}
					alt={file?.name}
					className="h-40 w-full rounded object-cover object-top"
				/>
				<p className="truncate font-semibold">{file.name}</p>
				<div className="flex justify-between text-xs text-nowrap">
					<span>
						{new Date(file?.createdAt).toLocaleString("en-US", {
							dateStyle: "long",
						})}
					</span>
					<span>{formatBytes(file?.size)}</span>
				</div>
			</div>
			<FileContextMenu file={file} />
		</ContextMenuWrapper>
	);
};

export default SingleFile;
