import { Folder } from "lucide-react";

const SingleFolder = ({ folder }) => {
	return (
		<div className="flex gap-3 border p-2 rounded-md hover:bg-gray-200 transition-colors duration-300">
			<Folder />
			<p className="font-semibold">{folder.name}</p>
		</div>
	);
};

export default SingleFolder;
