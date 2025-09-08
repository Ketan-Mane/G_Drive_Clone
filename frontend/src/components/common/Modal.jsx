import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdatePassword from "@/features/auth/components/UpdatePassword";
import RenameFile from "@/features/files/components/common/RenameFile";
import ShareFile from "@/features/files/components/common/ShareFile";
import FileDetails from "@/features/files/components/File/FileDetails";
import NewFolder from "@/features/files/components/Folder/NewFolder";
import { closeModal } from "@/store/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import FilePreview from "./FilePreview";

const Modal = () => {
	const dispatch = useDispatch();
	const { open, title, modalType, modalProps } = useSelector((state) => state.modal);

	const handleChange = () => {
		dispatch(closeModal());
	};

	if (modalType === "previewFile") {
		return <FilePreview {...modalProps} />;
	}

	return (
		<Dialog open={open} onOpenChange={handleChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<RenderFormModal modalProps={modalProps} modalType={modalType} />
			</DialogContent>
		</Dialog>
	);
};

export default Modal;

const RenderFormModal = ({ modalType, modalProps }) => {
	switch (modalType) {
		case "newFolder":
			return <NewFolder {...modalProps} />;
		case "renameFile":
			return <RenameFile {...modalProps} />;
		case "fileDetails":
			return <FileDetails {...modalProps} />;
		case "shareFile":
			return <ShareFile {...modalProps} />;
		case "updatePassword":
			return <UpdatePassword {...modalProps} />;
		default:
			return <>Form Not Found</>;
	}
};
