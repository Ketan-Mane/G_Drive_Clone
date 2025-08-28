import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import RenameFile from "@/features/files/components/common/RenameFile";
import NewFolder from "@/features/files/components/Folder/NewFolder";
import { closeModal } from "@/store/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
	const dispatch = useDispatch();
	const { open, title, modalType, modalProps } = useSelector(
		(state) => state.modal,
	);

	const handleChange = () => {
		dispatch(closeModal());
	};

	return (
		<Dialog open={open} onOpenChange={handleChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<RenderFormModal
					modalProps={modalProps}
					modalType={modalType}
				/>
				{/* <DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button
							onClick={() => dispatch(closeModal())}
							type="button"
							variant="secondary"
							className="cursor-pointer"
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter> */}
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
		default:
			return <>Form Not Found</>;
	}
};
