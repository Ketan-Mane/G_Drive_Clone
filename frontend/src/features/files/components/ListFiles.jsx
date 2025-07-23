import { DndContext } from "@dnd-kit/core";
import Files from "./File";
import Folder from "./Folder";
import toast from "react-hot-toast";

const ListFiles = () => {
	const handleDrag = (event) => {
		const { active, over } = event;

		if (!active || !over) return;

		const destinationFolder = over?.data?.current?.file;
		const sourceFile = active?.data?.current?.file;
		// console.log(destinationFolderData);
		// console.log(sourceFileData);
		console.log(event);
		toast.success(
			`${sourceFile?.name} moved to ${destinationFolder?.name}`,
		);
	};
	return (
		<div className="flex flex-col gap-3">
			<DndContext autoScroll={false} onDragEnd={handleDrag}>
				<Folder />
				<Files />
			</DndContext>
		</div>
	);
};

export default ListFiles;
