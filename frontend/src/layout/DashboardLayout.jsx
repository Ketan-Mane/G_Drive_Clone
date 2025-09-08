import { Outlet } from "react-router-dom";
import Modal from "@/components/common/Modal";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<div className="flex flex-col flex-1">
					<header className="hidden max-md:flex items-center justify-between px-4 py-2 border-b">
						<h1 className="text-lg font-semibold">Drive Clone</h1>
						<SidebarTrigger className="md:hidden" />
					</header>

					<main className="w-full p-2">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
			<Modal />
		</>
	);
}
