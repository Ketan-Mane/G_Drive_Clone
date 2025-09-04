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
import { FileUp, FolderPlus, Home, LogOut, Menu, Plus, Settings, Trash, UserPlus, Users } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openModal } from "@/store/modal/modalSlice";
import UploadFile from "@/features/files/components/File/UploadFile";

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
		label: "Profile",
		path: "/profile",
		icon: <Users size={16} />,
	},
	{
		label: "Bin",
		path: "/trash",
		icon: <Trash size={16} />,
	},
	{
		label: "Settings",
		path: "/settings",
		icon: <Settings size={16} />,
	},
];
const Sidebar = () => {
	const dispatch = useDispatch();
	const uploadRef = useRef();

	const { mutateAsync: logoutUser } = useLogout();
	const handleLogout = async () => {
		await logoutUser();
	};

	const handleFileUploadClick = () => {
		uploadRef.current?.openFileDialog();
	};

	return (
		<>
			<aside className="hidden w-full flex-col border-r lg:flex lg:w-64">
				<div className="p-6 text-xl font-bold">My Dashboard</div>
				<nav className="flex h-full w-full flex-col gap-2 p-4">
					<DropdownMenu>
						<DropdownMenuTrigger className="flex h-10 items-center justify-center rounded-md border">
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
					{menuOptins.map((menu, index) => (
						<NavItem key={index} icon={menu.icon} label={menu.label} to={menu.path} />
					))}

					<Button onClick={handleLogout} variant={"destructive"} className={"cursor-pointer"}>
						<LogOut size={16} /> Logout
					</Button>
				</nav>
			</aside>

			{/* Mobile Header */}
			<div className="flex w-full items-center justify-between border-b bg-white p-4 lg:hidden">
				<Button variant="ghost" size="icon">
					<Menu />
				</Button>
				<h1 className="text-lg font-bold">Dashboard</h1>
			</div>
			<UploadFile ref={uploadRef} />
		</>
	);
};

export default Sidebar;

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
