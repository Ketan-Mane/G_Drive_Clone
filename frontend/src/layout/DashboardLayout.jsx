import { Outlet } from "react-router-dom";
import Modal from "@/components/common/Modal";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				{/* <SidebarTrigger /> */}
				<main className="w-full p-2">
					<Outlet />
				</main>
			</SidebarProvider>
			<Modal />
		</>
	);
}
