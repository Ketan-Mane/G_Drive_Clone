import Files from "./File";
import Folder from "./Folder";

const ListFiles = () => {
	return (
		<div className="flex flex-col gap-3">
			<Folder />
			<Files />
		</div>
	);
};

export default ListFiles;
