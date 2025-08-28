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

const FolderContextMenu = ({ folder }) => {
	const dispatch = useDispatch();

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
				<ContextMenuItem>
					<Trash /> Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</>
	);
};

export default FolderContextMenu;
