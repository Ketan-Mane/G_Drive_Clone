import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegister } from "../hooks";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

const Register = () => {
	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			firstName: "",
			lastName: "",
			password: "",
		},
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const { mutateAsync: registerUser, isPending, reset } = useRegister();

	const onSubmit = async (data) => {
		await registerUser(data, {
			onSuccess: (responseData) => {
				const { data, success, message } = responseData;
				if(success){
					toast.success(message || "Registered Successfully");
					navigate("/login");
				}
			},
			onError: (error) => {
				if (error?.response) {
					const { data, message } = error?.response?.data;
					if (data?.errors) {
						const { errors } = data;
						Object.entries(errors).forEach(([field, message]) =>
							form.setError(field, { message })
						);
						return;
					}
					toast.error(message || "Failed to login try again");
					return;
				}
				toast.error(error?.message || "Failed to login try again");
			},
		});
	};

	if (isLoggedIn) return <Navigate to={"/"} />;

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-[500px] border p-10 rounded-xl shadow-lg">
				<h1 className="block w-full text-xl text-center uppercase font-bold mb-4">
					Register
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Username"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder="First Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											placeholder="First Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className={"w-full cursor-pointer"}
						>
							Submit {isPending && <Loader color="#fff" />}
						</Button>
					</form>
				</Form>
				<div className="text-center mt-5">
					Already have an account?{" "}
					<Link
						to={"/login"}
						className="hover:underline transition-all"
					>
						Login Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
