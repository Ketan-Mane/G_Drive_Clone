import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu";
import { Download, Files, FolderInput, Info, SquarePen, Trash, UserPlus } from "lucide-react";
import useMoveToTrash from "../../hooks/useMoveToTrash";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setClipboard } from "../../fileSlice";
import { openModal } from "@/store/modal/modalSlice";

const FileContextMenu = ({ file }) => {
	const dispatch = useDispatch();

	const { mutateAsync: moveToTrash } = useMoveToTrash();
	const handleMoveToTrash = async () => {
		const toast_id = toast.loading("Deleting file");
		await moveToTrash(
			{
				id: file?._id,
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
						toast.error("Failed to delete file", { id: toast_id });
					}
					toast.error("Failed to delete file", { id: toast_id });
				},
			},
		);
	};

	return (
		<>
			<ContextMenuContent className="max-w-52">
				<ContextMenuItem onClick={() => dispatch(setClipboard({ file, action: "move" }))}>
					<FolderInput /> Move
				</ContextMenuItem>
				<ContextMenuItem onClick={() => dispatch(setClipboard({ file, action: "copy" }))}>
					<Files /> Copy
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() =>
						dispatch(
							openModal({
								modalType: "renameFile",
								modalProps: { file },
								title: "Rename File",
							}),
						)
					}
				>
					<SquarePen /> Rename
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem onClick={() => window.open(file?.downloadUrl)}>
					<Download /> Download File
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() =>
						dispatch(
							openModal({ modalType: "shareFile", modalProps: { file }, title: `Share ${file?.name}` }),
						)
					}
				>
					<UserPlus /> Share
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() =>
						dispatch(
							openModal({
								modalType: "fileDetails",
								modalProps: { id: file?._id },
								title: file?.name,
							}),
						)
					}
				>
					<Info /> File Information
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive" onClick={handleMoveToTrash}>
					<Trash /> Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</>
	);
};

export default FileContextMenu;
