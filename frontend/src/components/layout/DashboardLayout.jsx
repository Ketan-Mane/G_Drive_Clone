import { Outlet, NavLink } from "react-router-dom";
import { Menu, Home, Settings, Users, LogOut, Plus, FileUp, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import Modal from "../common/Modal";

export default function DashboardLayout() {
	const dispatch = useDispatch();
	const { mutateAsync: logoutUser } = useLogout();

	const [open, setOpen] = useState(false);

	const handleLogout = async () => {
		await logoutUser(null, {
			onSuccess: () => {
				dispatch(logout());
			},
		});
	};

	const menuOptins = [
		{
			label: "Home",
			path: "/",
			icon: <Home size={16} />,
		},
		{
			label: "Profile",
			path: "/profile",
			icon: <Users size={16} />,
		},
		{
			label: "Settings",
			path: "/settings",
			icon: <Settings size={16} />,
		},
	];

	return (
		<div className="flex flex-col lg:flex-row lg:min-h-screen">
			{/* Sidebar */}
			<aside className="w-full lg:w-64 border-r hidden lg:flex flex-col">
				<div className="p-6 text-xl font-bold">My Dashboard</div>
				<nav className="w-full h-full flex flex-col gap-2 p-4">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="outline" className={"w-full cursor-pointer"}>
								New <Plus />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="start">
							<DropdownMenuItem
								onClick={() => setOpen(true)}
							>
								<FolderPlus /> New Folder
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<FileUp /> New File
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{menuOptins.map((menu, index) => (
						<NavItem
							key={index}
							icon={menu.icon}
							label={menu.label}
							to={menu.path}
						/>
					))}

					<Button
						onClick={handleLogout}
						variant={"destructive"}
						className={"cursor-pointer"}
					>
						<LogOut size={16} /> Logout
					</Button>
				</nav>
			</aside>

			{/* Mobile Header */}
			<div className="w-full lg:hidden flex items-center justify-between p-4 bg-white border-b">
				<Button variant="ghost" size="icon">
					<Menu />
				</Button>
				<h1 className="text-lg font-bold">Dashboard</h1>
			</div>

			{/* Main Content */}
			<main className="flex-1 p-2 lg:p-6">
				<Outlet />
			</main>

			<Modal
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
}

function NavItem({ to, icon, label }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition ${isActive ? "bg-gray-200 font-medium" : ""
				}`
			}
		>
			{icon}
			{label}
		</NavLink>
	);
}
