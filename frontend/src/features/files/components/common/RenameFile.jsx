import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import useFileOperation from "../../hooks/useFileOperation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modal/modalSlice";

const RenameFile = ({ file }) => {
	const dispatch = useDispatch();
	const form = useForm({
		defaultValues: {
			name: file?.name || "",
		},
	});

	const { mutateAsync: renameFile, isPending } = useFileOperation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.getValues("name") === file?.name) {
			dispatch(closeModal());
			return;
		}

		const payload = {
			...form.getValues(),
			parent: file?.parent,
			action: "renameFile",
		};
		await renameFile(
			{
				id: file?._id,
				payload,
			},
			{
				onSuccess: (responseData) => {
					const { message } = responseData;
					toast.success("File renamed successfully");
					dispatch(closeModal());
				},
				onError: (error) => {
					if (error?.response) {
						const { message } = error?.response?.data;
						toast.error(message || "Failed to rename file");
						return;
					}
					toast.error(error?.message || "Failed to rename file");
				},
			},
		);
	};
	return (
		<Form {...form}>
			<form className="space-y-2" onSubmit={handleSubmit}>
				<FormField
					contorl={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Enter folder name"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button>Save {isPending && <Loader color="#fff" />}</Button>
			</form>
		</Form>
	);
};

export default RenameFile;
