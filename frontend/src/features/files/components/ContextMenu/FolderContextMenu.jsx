import {
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { openModal } from "@/store/modal/modalSlice";
import {
	Files,
	FolderInput,
	Info,
	SquarePen,
	Trash,
	UserPlus,
} from "lucide-react";
import { useDispatch } from "react-redux";
import useMoveToTrash from "../../hooks/useMoveToTrash";
import toast from "react-hot-toast";

const FolderContextMenu = ({ folder }) => {
	const dispatch = useDispatch();

	const { mutateAsync: moveToTrash } = useMoveToTrash();
	const handleMoveToTrash = async () => {
		const toast_id = toast.loading("Deleting file");
		await moveToTrash(
			{
				id: folder?._id,
				payload: { action: "moveToTrash" },
			},
			{
				onSuccess: (data) => {
					const { file } = data?.data;
					toast.success(file?.name + " moved to trash", {
						id: toast_id,
					});
				},
				onError: (error) => {
					console.log(error);
					if (error?.response) {
					}
					toast.error("Failed to delete file", { id: toast_id });
				},
			},
		);
	};

	return (
		<>
			<ContextMenuContent className="max-w-52">
				<ContextMenuItem>
					<FolderInput /> Move
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() =>
						dispatch(
							openModal({
								modalType: "renameFile",
								modalProps: { file: folder },
								title: "Rename Folder",
							}),
						)
					}
				>
					<SquarePen /> Rename
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<UserPlus /> Share
				</ContextMenuItem>
				<ContextMenuItem>
					<Info /> Folder Information
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem
					variant="destructive"
					onClick={handleMoveToTrash}
				>
					<Trash /> Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</>
	);
};

export default FolderContextMenu;
