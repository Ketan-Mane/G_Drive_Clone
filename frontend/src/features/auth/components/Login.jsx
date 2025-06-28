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
import { useLogin } from "../hooks";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";

const Login = () => {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const { mutateAsync: loginUser, isPending } = useLogin();

	const onSubmit = async () => {
		const payload = form.getValues();
		await loginUser(payload, {
			onSuccess: (responseData) => {
				const { data, success, message } = responseData;
				if (success) {
					dispatch(login(data?.user));
					navigate("/");
					toast.success(message || "Login Successfull");
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
					Login
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username/Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Username or Email"
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
									<div className="w-full flex justify-end">
										<Link
											className="w-max text-center text-sm self-end text-red-700"
											href="/login"
										>
											Forgot password?
										</Link>
									</div>
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
					Don't have an account?{" "}
					<Link
						to={"/register"}
						className="hover:underline transition-all"
					>
						Create Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
