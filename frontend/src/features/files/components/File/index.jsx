import useFiles from "../../hooks/useFiles";
import SingleFile from "./SingleFile";

const Files = () => {
	const { data } = useFiles();

	const files = data?.filter((file) => !file?.isFolder);
	return (
		<div className="grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{files?.map((file) => (
				<SingleFile key={file?._id} file={file} />
			))}
		</div>
	);
};

export default Files;
