import { Button } from "@/components/ui/button";
import useLogout from "@/features/auth/hooks/useLogout";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { FileUp, FolderPlus, Home, LogOut, Plus, Settings, Trash, UserPlus, Users } from "lucide-react";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openModal } from "@/store/modal/modalSlice";
import UploadFile from "@/features/files/components/File/UploadFile";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const menuOptins = [
	{
		label: "Home",
		path: "/",
		icon: <Home size={16} />,
	},
	{
		label: "Shared with me",
		path: "/shared-with-me",
		icon: <UserPlus size={16} />,
	},
	{
		label: "Bin",
		path: "/trash",
		icon: <Trash size={16} />,
	},
	{
		label: "Profile",
		path: "/me",
		icon: <Users size={16} />,
	},
];

const AppSidebar = () => {
	const dispatch = useDispatch();
	const uploadRef = useRef();

	const isMobile = useIsMobile();

	const { mutateAsync: logoutUser } = useLogout();
	const handleLogout = async () => {
		await logoutUser();
	};

	const handleFileUploadClick = () => {
		uploadRef.current?.openFileDialog();
	};

	return (
		<>
			<Sidebar side={isMobile ? "right" : "left"}>
				<SidebarHeader className="text-center">
					<h1 className="text-2xl font-semibold">Drive Clone</h1>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<DropdownMenu>
											<DropdownMenuTrigger className="w-full flex h-10 items-center justify-center rounded-md border">
												New <Plus size={18} className="ml-1" />
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-56" align="start">
												<DropdownMenuItem
													onClick={() =>
														dispatch(
															openModal({
																modalType: "newFolder",
																title: "New Folder",
															}),
														)
													}
												>
													<FolderPlus /> New Folder
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem onClick={handleFileUploadClick}>
													<FileUp /> New File
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{menuOptins.map((item) => (
									<SidebarMenuItem key={item.path}>
										<SidebarMenuButton asChild>
											<NavItem to={item.path} icon={item.icon} label={item.label} />
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Button
									onClick={handleLogout}
									variant={"destructive"}
									className={"cursor-pointer hover:bg-red-500 hover:text-white"}
								>
									<LogOut size={16} /> Logout
								</Button>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<UploadFile ref={uploadRef} />
		</>
	);
};

export default AppSidebar;

function NavItem({ to, icon, label }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				clsx(
					"hover:bg-muted flex items-center gap-2 rounded-md px-4 py-2 transition",
					isActive ? "bg-gray-200 font-medium" : "",
				)
			}
		>
			{icon}
			{label}
		</NavLink>
	);
}
