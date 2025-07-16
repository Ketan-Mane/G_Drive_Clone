import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import useCreateFolder from "../../hooks/useCreateFolder";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modal/modalSlice";

const NewFolder = () => {
	const dispatch = useDispatch();
	const form = useForm({
		defaultValues: {
			name: "",
		},
	});

	const { mutateAsync: createFolder, isPending } = useCreateFolder();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = form.getValues();
		await createFolder(payload, {
			onSuccess: (responseData) => {
				const { message } = responseData;
				toast.success(message || "New folder created");
				dispatch(closeModal());
			},
			onError: (error) => {
				if (error?.response) {
					const { message } = error?.response?.data;
					toast.error(message || "Failed to create folder");
					return;
				}
				toast.error(error?.message || "Failed to create folder");
			},
		});
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
				<Button>Submit {isPending && <Loader color="#fff" />}</Button>
			</form>
		</Form>
	);
};

export default NewFolder;
