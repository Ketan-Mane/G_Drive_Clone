import {
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { openModal } from "@/store/modal/modalSlice";
import { ClipboardPaste, FileUp, FolderPlus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useFileOperation from "../../hooks/useFileOperation";
import UploadFile from "../File/UploadFile";
import { useRef } from "react";

const GlobalContextMenu = () => {
	const dispatch = useDispatch();
	const uploadRef = useRef();

	const { mutateAsync: fileOperation } = useFileOperation();

	const { clipboard, currentFolderId } = useSelector((state) => state.file);

	const handleClipboard = async () => {
		const { action, file } = clipboard;
		const payload = { action, parent: currentFolderId };
		await fileOperation(
			{ id: file?._id, payload },
			{
				onSuccess: (data) => {
					console.log(data);
				},
				onError: (error) => {
					console.log(error);
				},
			},
		);
	};

	const handleFileUploadClick = () => {
		uploadRef.current?.openFileDialog();
	};

	return (
		<>
			<ContextMenuContent>
				{clipboard && (
					<ContextMenuItem onClick={handleClipboard}>
						<ClipboardPaste /> Paste
					</ContextMenuItem>
				)}
				<ContextMenuItem
					onClick={() =>
						dispatch(
							openModal({
								modalType: "newFolder",
								title: "New Folder",
							}),
						)
					}
				>
					<FolderPlus /> New Folder
				</ContextMenuItem>
				<ContextMenuItem onClick={handleFileUploadClick}>
					<FileUp /> File Upload
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">
					<Trash /> Go to Trash
				</ContextMenuItem>
			</ContextMenuContent>
			<UploadFile ref={uploadRef} />
		</>
	);
};

export default GlobalContextMenu;
