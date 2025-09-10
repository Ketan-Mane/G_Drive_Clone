import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
import SingleFileUpload from "./SingleFileUpload";
import useUploadFile from "../../hooks/useUploadFile";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useCreateFile from "../../hooks/useCreateFile";

const UploadFile = forwardRef((props, ref) => {
	const fileInputRef = useRef(null);
	const [close, setClose] = useState(true);
	const [minimize, setMinimize] = useState(false);
	const [queue, setQueue] = useState([]); // upload queue
	const [isUploading, setIsUploading] = useState(false);

	const { currentFolderId } = useSelector((state) => state.file);
	const { mutateAsync: createFile } = useCreateFile();
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

		const uploadEntries = filesArray.map((file) => ({
			file,
			progress: 0,
			status: "pending",
		}));

		setQueue((prev) => [...prev, ...uploadEntries]);
		setClose(false);
		event.target.value = null;
	};

	// Effect to handle queue system
	const processNextFile = useCallback(async () => {
		if (isUploading) return;
		if (queue.length === 0) return;

		const current = queue[0];
		setIsUploading(true);

		try {
			// Step 1: Ask backend to create file + get signed URL
			const payload = {
				name: current.file.name,
				size: current.file.size,
				type: current.file.type,
				parent_id: currentFolderId,
			};
			const { data } = await createFile(payload);
			const { file: newFile, url } = data;
			// Step 2: Upload file to S3 using signed URL
			await uploadFile(
				{
					file: current.file,
					url,
					onProgress: (percent) => {
						setQueue((prev) => {
							const updated = [...prev];
							updated[0] = {
								...updated[0],
								progress: percent,
								status: percent === 100 ? "processing" : "uploading",
							};
							return updated;
						});
					},
				},
				{
					onSuccess: async (data) => {
						console.log(data);
					},
					onError: (error) => {
						console.log(error);
					},
				},
			);
			// Mark as success
			setQueue((prev) => {
				const updated = [...prev];
				updated[0] = { ...updated[0], status: "success", progress: 100 };
				return updated;
			});
		} catch (error) {
			toast.error(error?.message || "Failed to upload file");
			setQueue((prev) => {
				const updated = [...prev];
				updated[0] = { ...updated[0], status: "error" };
				return updated;
			});
		} finally {
			// Remove finished file & process next
			setQueue((prev) => prev.slice(1));
			setIsUploading(false);
		}
	}, [isUploading, queue, createFile, uploadFile, currentFolderId]);

	useEffect(() => {
		if (!isUploading && queue.length > 0) {
			processNextFile();
		}
	}, [queue, isUploading, processNextFile]);

	return (
		<div
			className={clsx(
				"right-2 bottom-1 md:bottom-3 flex w-sm flex-col gap-y-1 rounded-md p-2 shadow-md select-none bg-white",
				close ? "hidden" : "fixed",
			)}
		>
			<input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">
					Uploading {queue.filter((u) => u.status === "uploading" || u.status === "processing").length} /
					{queue.length} Item(s)
				</h3>
				<span className="flex items-center gap-2">
					<ChevronDown
						onClick={() => setMinimize(!minimize)}
						size={22}
						className={clsx("cursor-pointer transition", close ? "rotate-180" : "")}
					/>
					<X
						size={20}
						onClick={() => {
							setClose(true);
							setQueue([]);
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
				{queue?.map((upload, index) => (
					<SingleFileUpload upload={upload} key={index} />
				))}
			</div>
		</div>
	);
});

export default UploadFile;
