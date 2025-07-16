import UploadProgressIcon from "@/components/ui/upload-progress-icon";
import { Check, LoaderCircle, X } from "lucide-react";

const SingleFileUpload = ({ upload }) => {
	const { file, progress, status } = upload;

	return (
		<div className="flex items-center justify-between">
			<span>{file.name}</span>
			{status === "pending" ? (
				<LoaderCircle size={20} className="animate-spin" />
			) : status === "uploading" ? (
				<UploadProgressIcon progress={progress} />
			) : status === "success" ? (
				<Check
					size={20}
					className="rounded-full bg-green-600 p-0.5 text-white"
				/>
			) : (
				<X
					size={20}
					className="rounded-full bg-red-600 p-0.5 text-white"
				/>
			)}
		</div>
	);
};

export default SingleFileUpload;
