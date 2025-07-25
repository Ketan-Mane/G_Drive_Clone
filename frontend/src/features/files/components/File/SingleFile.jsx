import { formatBytes } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className="flex flex-col gap-2 rounded-md border p-2 transition-colors duration-300 bg-white hover:bg-gray-100"
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
	);
};

export default SingleFile;
