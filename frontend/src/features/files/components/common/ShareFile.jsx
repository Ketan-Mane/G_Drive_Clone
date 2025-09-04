import React from "react";
import useFile from "../../hooks/useFile";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useShareFile from "../../hooks/useShareFile";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { stringToColor } from "@/lib/utils";

const ShareFile = ({ file }) => {
	const { data: fileDetails } = useFile({ id: file?._id });
	const { mutateAsync: shareFile, isPending } = useShareFile();

	const form = useForm({
		defaultValues: {
			email: "",
			file: file?._id,
		},
	});

	const handleShare = async () => {
		if (form.getValues("email") === fileDetails?.owner?.email) {
			toast.error("You already own this file");
			return;
		}
		const payload = { ...form.getValues(), action: "add" };
		await shareFile(payload, {
			onSuccess: (data) => {
				const { message } = data;
				toast.success(message || "File access updated");
				form.reset();
			},
			onError: (error) => {
				if (error?.response) {
					const { status, message } = error?.response?.data;
					toast.error(message || "Failed to update file access");
					return;
				}

				toast.error(error?.message || "Failed to update file access");
			},
		});
	};

	const removeFileAccess = async (id) => {
		const payload = { user: id, file: file?._id, action: "remove" };
		await shareFile(payload, {
			onSuccess: (data) => {
				const { message } = data;
				toast.success(message || "File access updated");
			},
			onError: (error) => {
				if (error?.response) {
					const { status, message } = error?.response?.data;
					toast.error(message || "Failed to update file access");
					return;
				}
				toast.error(error?.message || "Failed to update file access");
			},
		});
	};

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleShare)}>
					<FormField
						control={form.control}
						rules={{
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Enter a valid email",
							},
						}}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Enter email to share access</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>

			{fileDetails?.sharedWith?.length > 0 && (
				<div className="flex gap-2 flex-col">
					<p>People with access</p>
					{fileDetails?.sharedWith?.map((user) => (
						<div className="flex gap-2 items-center justify-between" key={user?._id}>
							<div className="flex gap-2 items-center">
								<span
									style={{ background: stringToColor(user?.email) }}
									className="w-7 h-7 rounded-full flex justify-center items-center text-white"
								>
									{user?.firstName?.charAt(0)}
								</span>
								<span>{user?.firstName + " " + user?.lastName}</span>
							</div>

							<button type="button" onClick={() => removeFileAccess(user?._id)} title="Remove Access">
								<X size={20} />
							</button>
						</div>
					))}
				</div>
			)}

			<Button type="button" onClick={handleShare} className={"w-full cursor-pointer"}>
				Done
			</Button>
		</div>
	);
};

export default ShareFile;
