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

const TrashContextMenu = ({ file }) => {
	const { mutateAsync: fileOperation, isPending } = useFileOperation();
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

	const handleDelete = () => {
		console.log("Deleting File");
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
