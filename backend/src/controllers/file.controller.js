import fileService from "../services/file.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import path from "path";
import fs from "fs";
import ApiError from "../utils/ApiError.js";
import s3 from "../utils/s3Client.js";
import { v4 as uuid } from "uuid";

const getFiles = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const files = await fileService.getFiles({ parent: id });
	return res.status(200).json(new ApiResponse(200, { files }));
});

const searchFiles = asyncHandler(async (req, res) => {
	const { search, type } = req.query;
	const user = req.user;
	const files = await fileService.searchFiles({ search, type, parent: user?.rootFolder.toString() });

	return res.status(200).json(new ApiResponse(200, { files }));
});

const getTrashedFiles = asyncHandler(async (req, res) => {
	const user = req.user;
	const files = await fileService.getFiles({
		parent: user?.rootFolder.toString(),
		isTrashed: true,
	});
	return res.status(200).json(new ApiResponse(200, { files }));
});

const getSharedWithMeFiles = asyncHandler(async (req, res) => {
	const user = req.user;
	const files = await fileService.getSharedWithMeFiles({ user });
	return res.status(200).json(new ApiResponse(200, { files }));
});

const getFile = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const file = await fileService.getFileById({ id });
	if (!file) {
		throw new ApiError(404, "File not found");
	}

	return res.status(200).json(new ApiResponse(200, { file }));
});

const previewFile = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const file = await fileService.getFileById({ id, excludePath: false });
	// const filePath = path.join(file?.contentPath);
	// const readStream = fs.createReadStream(filePath);

	const data = await s3.getFileContent(file?.contentPath);

	res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);
	// readStream.pipe(res);
	data.Body.pipe(res);
});

const createFile = asyncHandler(async (req, res) => {
	const uploadedFile = req.file;
	const user = req.user;
	const parent = user?.rootFolder;
	const { name, size, type } = req.body;

	const newFile = await fileService.createFile({ name, size, owner: user, parent, type });
	// const newFile = await fileService.createFile({
	// 	// name: uploadedFile.originalname,
	// 	// size: uploadedFile.size,
	// 	name,
	// 	size,
	// 	owner: user,
	// 	parent,
	// 	// contentPath: uploadedFile?.path,
	// 	type: uploadedFile?.mimetype,
	// });

	// const file = await fileService.updateThumbnail({
	// 	id: newFile._id,
	// 	file: uploadedFile,
	// });

	const ext = name.includes(".") ? name.split(".").pop() : "";
	const key = ext ? `${uuid()}.${ext}` : uuid();
	const url = await s3.getUploadUrl(key, type);
	const updateContentPath = await fileService.updateContentPath({ id: newFile?._id, path: key });

	return res.status(201).json(new ApiResponse(201, { file: newFile, url }, "File uploaded successfully"));
});

const createFolder = asyncHandler(async (req, res) => {
	const { name, parent } = req.body;
	const folder = await fileService.createFile({
		name,
		owner: req.user,
		size: 0,
		parent,
		isFolder: true,
	});

	return res.status(201).json(new ApiResponse(201, { folder }, "Folder created successfully"));
});

const updateFile = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { parent, action, name } = req.body;
	const user = req?.user;
	let file;
	switch (action) {
		case "move":
			file = await fileService.moveFile({ id, parent });
			break;
		case "copy":
			file = await fileService.copyFile({ id, parent });
			break;
		case "moveToTrash":
			file = await fileService.moveToTrash({ id, user });
			break;
		case "restore":
			file = await fileService.restoreTrash({ id });
			break;
		case "renameFile":
			file = await fileService.renameFile({ id, name, parent });
			break;
		default:
			return res.status(400).json(new ApiResponse(400, null, "Invalid action"));
	}

	return res.status(200).json(new ApiResponse(200, { file }, "Success"));
});

const deleteFile = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await fileService.deleteFile({ id });
	return res.status(200).json(new ApiResponse(200, null, "File deleted successfully."));
});

const shareFile = asyncHandler(async (req, res) => {
	const { email, file: fileId, action, user } = req.body;
	let file = null;

	switch (action) {
		case "add":
			file = await fileService.shareFile({ email, id: fileId });
			break;
		case "remove":
			file = await fileService.removeFileAccess({ user, id: fileId });
			break;
		default:
			return res.status(400).json(new ApiResponse(400, null, "Invalid action"));
	}
	return res.status(200).json(new ApiResponse(200, { file }, "Access Updated"));
});

export default {
	getFiles,
	searchFiles,
	getTrashedFiles,
	getSharedWithMeFiles,
	getFile,
	previewFile,
	createFile,
	createFolder,
	updateFile,
	deleteFile,
	shareFile,
};
