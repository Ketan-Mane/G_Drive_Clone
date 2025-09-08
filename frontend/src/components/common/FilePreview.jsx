import { Backdrop } from "@mui/material";
import { X } from "lucide-react";
import { getFileCategory } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modal/modalSlice";

const FilePreview = ({ file }) => {
	const dispatch = useDispatch();
	if (!file) return null;

	const { previewUrl, name, type } = file;

	const fileType = getFileCategory(type);

	const officeExtensions = [".doc", ".docx", ".xls", ".xlsx"];
	const isOfficeFile = officeExtensions.some((ext) => file.name.endsWith(ext));

	const renderFile = () => {
		switch (fileType) {
			case "image":
				return <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />;
			case "video":
				return <video src={previewUrl} controls className="w-full h-full object-contain" />;
			case "audio":
				return <audio src={previewUrl} controls className="w-full" />;
			case "pdf":
				return <iframe src={previewUrl} title="PDF Preview" className="w-full h-full"></iframe>;
			case "text":
				return <iframe src={previewUrl} title="Text Preview" className="w-full h-full"></iframe>;
			default:
				if (isOfficeFile) {
					return (
						<iframe
							src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(previewUrl)}`}
							className="w-full h-full"
							title={file?.name}
						/>
					);
				}
				return (
					<p className="text-gray-500">
						Cannot preview this file.{" "}
						<a
							href={previewUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline"
						>
							Download
						</a>{" "}
						instead.
					</p>
				);
		}
	};

	return (
		<>
			<Backdrop
				sx={(theme) => ({
					color: "#fff",
					backgroundColor: "rgba(0, 0, 0, 0.85)",
					zIndex: theme.zIndex.drawer + 1,
				})}
				open={true}
			>
				<div className="w-full h-full overflow-y-auto">
					<div className="w-full flex justify-between items-center ">
						<div className="sm:text-lg">{name}</div>
						<button onClick={() => dispatch(closeModal())} className="cursor-pointer">
							<X />
						</button>
					</div>
					<div className="w-full h-[calc(100vh-28px)]">{renderFile()}</div>
				</div>
			</Backdrop>
		</>
	);
};

export default FilePreview;
