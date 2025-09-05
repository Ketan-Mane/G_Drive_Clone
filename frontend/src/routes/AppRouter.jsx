import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Login, Register } from "@/features/auth/components";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import HomePage from "@/pages/HomePage";
import App from "@/App";
import TrashFiles from "@/pages/TrashFiles";
import SharedWithMePage from "@/pages/SharedWithMePage";
import ProfilePage from "@/pages/ProfilePage";

const AppRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />}>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route element={<ProtectedRoute />}>
				<Route element={<DashboardLayout />}>
					<Route index element={<HomePage />} />
					<Route path="/trash" element={<TrashFiles />} />
					<Route path="/shared-with-me" element={<SharedWithMePage />} />
					<Route path="/me" element={<ProfilePage />} />
				</Route>
			</Route>
		</Route>,
	),
);

export default AppRouter;
