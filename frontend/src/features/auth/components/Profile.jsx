import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useUpdateUser from "../hooks/useUpdateUser";
import toast from "react-hot-toast";
import { openModal } from "@/store/modal/modalSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const { mutateAsync: updateProfile } = useUpdateUser();

	const { user } = useSelector((state) => state.auth);

	const form = useForm({
		defaultValues: {
			email: user?.email,
			firstName: user?.firstName,
			lastName: user?.lastName,
		},
	});

	const onSubmit = async () => {
		if (
			form.getValues("email") === user?.email &&
			form.getValues("firstName") === user?.firstName &&
			form.getValues("lastName") === user?.lastName
		) {
			toast.error("No changes detected");
			return;
		}

		await updateProfile(
			{ user: form.getValues() },
			{
				onSuccess: (data) => {
					toast.success("Profile updated successfully");
				},
				onError: (error) => {
					if (error?.response) {
						toast.error(error?.response?.data?.message || "Something went wrong");
						return;
					}
					toast.error(error?.message || "Something went wrong");
				},
			},
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold">My Profile</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input className={"w-full sm:max-w-sm"} placeholder="Email" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="firstName"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input className={"w-full sm:max-w-sm"} placeholder="First Name" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="lastName"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input className={"w-full sm:max-w-sm"} placeholder="Last Name" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type="submit" className={"cursor-pointer"}>
						Save
					</Button>
				</form>
			</Form>

			<hr />
			<Button
				className={"cursor-pointer w-52"}
				onClick={() => dispatch(openModal({ modalType: "updatePassword", title: "Update Password" }))}
			>
				Update Password
			</Button>
		</div>
	);
};

export default Profile;
