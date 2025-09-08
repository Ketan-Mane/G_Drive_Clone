import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const FileSearchFilter = ({ search, type, setSearch, setType }) => {
	return (
		<div className="my-4">
			<div className="flex justify-between items-center gap-2">
				<Input
					placeholder="Search files and folders..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-1/2"
				/>

				<Select onValueChange={setType} defaultValue="all">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="folder">Folders</SelectItem>
						<SelectItem value="image">Images</SelectItem>
						<SelectItem value="document">Documents</SelectItem>
						<SelectItem value="video">Videos</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default FileSearchFilter;
