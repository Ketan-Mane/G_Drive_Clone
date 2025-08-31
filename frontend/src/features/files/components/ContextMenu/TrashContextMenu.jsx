import {
	ContextMenuContent,
	ContextMenuItem,
} from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { MdRestore } from "react-icons/md";
import useFileOperation from "../../hooks/useFileOperation";
import toast from "react-hot-toast";
import DeleteModal from "@/components/common/DeleteModal";
import useDeleteFile from "../../hooks/useDeleteFIle";

const TrashContextMenu = ({ file }) => {
	const { mutateAsync: fileOperation, isPending } = useFileOperation();
	const { mutateAsync: deleteFile, isPending: isDeleting } = useDeleteFile();
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleRestore = async () => {
		const payload = { action: "restore" };
		await fileOperation(
			{
				id: file?._id,
				payload,
			},
			{
				onSuccess: (data) => {
					toast.success("File restored successfully");
				},
				onError: (error) => {
					if (error?.response) {
						toast.error(
							error?.response?.data?.message ||
								"Failed to restore file",
						);
						return;
					}
					toast.error(error?.message || "Failed to restore file");
				},
			},
		);
	};

	const handleDelete = async () => {
		await deleteFile(
			{ id: file?._id },
			{
				onSuccess: (data) => {
					toast.success("File deleted successfully");
				},
				onError: (error) => {
					if (error?.response) {
						toast.error(
							error?.response?.data?.message ||
								"Failed to delete file",
						);
						return;
					}
					toast.error(error?.message || "Failed to delete file");
				},
			},
		);
	};

	return (
		<>
			<ContextMenuContent className="max-w-52">
				<ContextMenuItem onClick={handleRestore}>
					<MdRestore />
					Restore
				</ContextMenuItem>
				<ContextMenuItem
					variant="destructive"
					onClick={() => setOpenDeleteModal(true)}
				>
					<Trash2 /> Delete Forever
				</ContextMenuItem>
			</ContextMenuContent>
			{openDeleteModal && (
				<DeleteModal
					deleteFunction={handleDelete}
					file={file}
					onClose={() => setOpenDeleteModal(false)}
				/>
			)}
		</>
	);
};

export default TrashContextMenu;
