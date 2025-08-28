import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import SingleFileUpload from "./SingleFileUpload";
import useUploadFile from "../../hooks/useUploadFile";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadFile = forwardRef((props, ref) => {
	const fileInputRef = useRef(null);
	const [close, setClose] = useState(true);
	const [minimize, setMinimize] = useState(false);
	const [uploads, setUploads] = useState([]);

	const { currentFolderId } = useSelector((state) => state.file);
	const { mutateAsync: uploadFile } = useUploadFile();

	useImperativeHandle(ref, () => ({
		openFileDialog: () => {
			fileInputRef.current?.click();
		},
	}));

	const handleFileChange = (event) => {
		const files = event.target.files;
		if (!files) return;
		const filesArray = Array.from(files);
		const uploadEntries = filesArray?.map((file) => ({
			file,
			progress: 0,
			status: "pending",
		}));
		setUploads(uploadEntries);
		setClose(false);
		event.target.value = null;
		uploadEntries.forEach(async (upload, index) => {
			const { file } = upload;

			setUploads((prev) => {
				const updated = [...prev];
				updated[index] = {
					...updated[index],
					status: "uploading",
				};
				return updated;
			});
			await uploadFile(
				{ file, parent_id: currentFolderId },
				{
					onSuccess: () => {
						setUploads((prev) => {
							const updated = [...prev];
							updated[index] = {
								...updated[index],
								progress: 100,
								status: "success",
							};
							return updated;
						});
					},
					onError: (error) => {
						if (error?.response) {
							const { message } = error?.response?.data;
							toast.error(message || "Failed to upload file");
							setUploads((prev) => {
								const updated = [...prev];
								updated[index] = {
									...updated[index],
									status: "error",
								};
								return updated;
							});
							return;
						}

						toast.error(error?.message || "Failed to upload file");
					},
				},
			);
		});
	};

	return (
		<div
			className={clsx(
				"right-2 bottom-3 flex w-sm flex-col gap-y-1 rounded-md p-2 shadow-md select-none",
				close ? "hidden" : "absolute",
			)}
		>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
				multiple
			/>
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">Uploading 1 Item</h3>
				<span className="flex items-center gap-2">
					<ChevronDown
						onClick={() => setMinimize(!minimize)}
						size={22}
						className={clsx(
							"cursor-pointer transition",
							close ? "rotate-180" : "",
						)}
					/>
					<X
						size={20}
						onClick={() => {
							setClose(true);
							setUploads([]);
						}}
						className="cursor-pointer"
					/>
				</span>
			</div>
			<div
				className={clsx(
					"flex flex-col gap-1 overflow-x-hidden overflow-y-auto pr-1",
					minimize ? "max-h-0" : "max-h-40",
				)}
			>
				{uploads?.map((upload, index) => (
					<SingleFileUpload upload={upload} key={index} />
				))}
			</div>
		</div>
	);
});

export default UploadFile;
