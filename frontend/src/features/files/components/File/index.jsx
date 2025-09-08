import useFiles from "../../hooks/useFiles";
import SingleFile from "./SingleFile";

const Files = () => {
	const { data } = useFiles();

	const files = data?.filter((file) => !file?.isFolder);
	return (
		<div className="grid cursor-default grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			{files?.length > 0 ? (
				files?.map((file) => <SingleFile key={file?._id} file={file} />)
			) : (
				<div className="col-span-4 text-center mt-[40vh] text-neutral-600 sm:text-xl font-semibold">
					No files yet. Upload your first file to get started.
				</div>
			)}
		</div>
	);
};

export default Files;
