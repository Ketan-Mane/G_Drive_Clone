import useFiles from "../../hooks/useFiles";
import SingleFolder from "./SingleFolder";

const Folders = () => {
	const { data } = useFiles();

	const folders = data?.filter((item) => item?.isFolder) || [];
	return (
		<div className="grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{folders?.map((folder) => (
				<SingleFolder key={folder?._id} folder={folder} />
			))}
		</div>
	);
};

export default Folders;
