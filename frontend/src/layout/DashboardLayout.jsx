import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Modal from "@/components/common/Modal";

export default function DashboardLayout() {
	return (
		<div className="flex flex-col lg:flex-row lg:min-h-screen">
			<Sidebar />

			<main className="flex-1 p-2 lg:p-6">
				<Outlet />
			</main>

			{/* Pop Modal */}
			<Modal />
		</div>
	);
}
