import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import Files from "./File";
import Folder from "./Folder";
import toast from "react-hot-toast";
import useMoveFile from "../hooks/useMoveFile";
import { useSelector } from "react-redux";

const ListFiles = () => {
	const { mutateAsync: moveFile } = useMoveFile();

	const { rootFolderId, currentFolderId } = useSelector(
		(state) => state.file,
	);
	console.log(currentFolderId);
	console.log(rootFolderId);

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 8, // ✅ drag only starts after 8px movement
		},
	});
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			distance: 20,
			delay: 100,
			tolerance: 100,
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);

	const handleDrag = async (event) => {
		const { active, over } = event;

		if (!active || !over || active?.id === over?.id) return;

		const destinationFolder = over?.data?.current?.file;
		const sourceFile = active?.data?.current?.file;
		const payload = { action: "move", parent: destinationFolder?._id };
		await moveFile(
			{ id: sourceFile?._id, payload },
			{
				onSuccess: (data) => {
					toast.success(
						`${sourceFile?.name} moved to ${destinationFolder?.name}`,
					);
				},
				onError: (error) => {
					if (error?.response) {
						const { data } = error?.response;
						console.log(data);
						toast.error(data?.message || "Failed to move file");
						return;
					}
					toast.error("Failed to move file");
				},
			},
		);
	};
	return (
		<div className="flex flex-col gap-3">
			<DndContext
				autoScroll={false}
				sensors={sensors}
				onDragEnd={handleDrag}
			>
				<Folder />
				<Files />
			</DndContext>
		</div>
	);
};

export default ListFiles;
