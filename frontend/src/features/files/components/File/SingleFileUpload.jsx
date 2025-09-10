import UploadProgressIcon from "@/components/ui/upload-progress-icon";
import { Check, LoaderCircle, X } from "lucide-react";

const SingleFileUpload = ({ upload }) => {
	const { file, progress, status } = upload;

	return (
		<div className="flex items-center justify-between text-sm py-1">
			<span className="truncate">{file.name}</span>
			{status === "pending" || status === "processing" ? (
				<LoaderCircle size={18} className="animate-spin p-0 m-0" />
			) : status === "uploading" ? (
				<UploadProgressIcon progress={progress} />
			) : status === "success" ? (
				<Check size={20} className="shrink-0 rounded-full bg-green-600 p-0.5 text-white" />
			) : (
				<X size={20} className="rounded-full bg-red-600 p-0.5 text-white" />
			)}
		</div>
	);
};

export default SingleFileUpload;
