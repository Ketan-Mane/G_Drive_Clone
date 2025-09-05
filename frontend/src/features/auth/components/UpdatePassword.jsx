import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import useUpdatePassword from "../hooks/useUpdatePassword";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modal/modalSlice";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const { mutateAsync: updatePassword } = useUpdatePassword();

	const form = useForm({
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const onSubmit = async (data) => {
		if (data.newPassword !== data.confirmNewPassword) {
			toast.error("New Password and Confirm New Password do not match");
			return;
		}
		await updatePassword(
			{ currentPassword: data.currentPassword, newPassword: data.newPassword },
			{
				onSuccess: () => {
					toast.success("Password updated successfully");
					dispatch(closeModal());
				},
				onError: (error) => {
					toast.error("Failed to update password");
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					name="currentPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Current Password" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="newPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="New Password" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name="confirmNewPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Confirm New Password" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" className={"cursor-pointer"}>
					Update Password
				</Button>
			</form>
		</Form>
	);
};

export default UpdatePassword;
