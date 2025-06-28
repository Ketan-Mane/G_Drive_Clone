import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import { Login, Register } from "@/features/auth/components";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HomePage from "@/pages/HomePage";
import App from "@/App";

const AppRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />}>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route element={<ProtectedRoute />}>
				<Route element={<DashboardLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Route>
		</Route>
	)
);

export default AppRouter;
