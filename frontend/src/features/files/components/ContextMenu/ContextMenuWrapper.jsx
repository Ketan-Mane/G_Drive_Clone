import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

const ContextMenuWrapper = ({ children }) => {
	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger>{children}</ContextMenuTrigger>
			</ContextMenu>
		</>
	);
};

export default ContextMenuWrapper;
