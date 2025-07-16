const SingleFile = ({ file }) => {
	return (
		<div className="flex flex-col gap-2 rounded-md border p-2 transition-colors duration-300 hover:bg-gray-200">
			<img
				src={file?.thumbnailUrl}
				alt={file?.name}
				className="w-full h-32 object-cover object-top"
			/>
			<p>{file.name}</p>
			<div className="flex justify-between text-xs">
				<span>{new Date(file?.createdAt).toLocaleString()}</span>
				<span>{file?.size}</span>
			</div>
		</div>
	);
};

export default SingleFile;
