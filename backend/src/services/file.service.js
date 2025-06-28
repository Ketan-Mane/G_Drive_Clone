import { File } from "../models/file.model.js";
import ApiError from "../utils/ApiError.js";
import generateThumbnail from "../utils/generateThumbnail.js";

const getFiles = async (parentId) => {
	try {
		return await File.find({
			parent: parentId,
		});
	} catch (error) {
		throw error;
	}
};

const createFile = async ({ name, size, owner, parent, isFolder = false }) => {
	try {
		const downloadUrl = `${process.env.APP_URL}/api/files/download/`;
		const previewUrl = `${process.env.APP_URL}/api/files/preview/`;
		if (!parent) {
			parent = owner?.rootFolder;
		}

		const file = await File.create({
			name,
			size,
			owner,
			parent,
			isFolder,
			downloadUrl,
			previewUrl,
		});

		return file;
	} catch (error) {
		if (error.code === 11000) {
			throw new ApiError(
				409,
				"File with same name already exists",
				null,
				null
			);
		}
		throw error;
	}
};

const updateThumbnail = async ({ id, file }) => {
	try {
		const thumbnailUrl = await generateThumbnail(id, file.path);
		const updatedFile = await File.findByIdAndUpdate(id, {
			thumbnailUrl,
		});
		return updatedFile;
	} catch (error) {
		throw error;
	}
};

export default { getFiles, createFile, updateThumbnail };
