import fileService from "../services/file.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const getFiles = asyncHandler(async (req, res) => {
	const { parent } = req.params;
	const files = await fileService.getFiles(parent);
	return res.status(200).json(new ApiResponse(200, { files }));
});

const createFile = asyncHandler(async (req, res) => {
	const uploadedFile = req.file;
	const user = req.user;
	const parent = user?.rootFolder;

	const newFile = await fileService.createFile({
		name: uploadedFile.originalname,
		size: uploadedFile.size,
		owner: user,
		parent,
	});

	const file = await fileService.updateThumbnail({
		id: newFile._id,
		file: uploadedFile,
	});

	return res
		.status(201)
		.json(new ApiResponse(201, { file }, "File uploaded successfully"));
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

	return res
		.status(201)
		.json(new ApiResponse(201, { folder }, "Folder created successfully"));
});

const updateFile = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { parent, action, name } = req.body;
	let file;
	switch (action) {
		case "move":
			file = await fileService.moveFile({ id, parent });
			break;
		case "copy":
			file = await fileService.copyFile({ id, parent });
			break;
		case "moveToTrash":
			file = await fileService.moveToTrash({ id });
			break;
		case "renameFile":
			file = await fileService.renameFile({ id, name, parent });
			break;
		default:
			return res
				.status(400)
				.json(new ApiResponse(400, null, "Invalid action"));
	}

	return res.status(200).json(new ApiResponse(200, { file }, "Success"));
});
export default { getFiles, createFile, createFolder, updateFile };
