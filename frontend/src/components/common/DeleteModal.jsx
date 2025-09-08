import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import Bin from "@/assets/icons/bin.png";

const DeleteModal = ({
	title = "Are you sure you want to delete this permanently?",
	file,
	deleteFunction,
	onClose,
}) => {
	const handleDelete = async () => {
		await deleteFunction();
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogTitle className="flex items-center gap-2 text-red-500">
					<TriangleAlert />
					Delete
				</DialogTitle>

				<div className="flex flex-col gap-y-4 items-center">
					<img src={Bin} alt="bin" className="w-14" />
					<h2 className="text-xl font-semibold">Are you sure you want to delete this file?</h2>
					<p>{file?.name}</p>
				</div>

				<DialogFooter className="sm:justify-end">
					<DialogClose asChild>
						<Button type="button" className="cursor-pointer">
							Cancel
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button onClick={handleDelete} type="button" variant="destructive" className="cursor-pointer">
							Delete
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
