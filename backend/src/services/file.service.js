import { File } from "../models/file.model.js";
import ApiError from "../utils/ApiError.js";
import generateThumbnail from "../utils/generateThumbnail.js";
import path from "path";
import fs from "fs";
import { THUMBNAIL_DIR } from "../constants.js";

const getFiles = async ({ parent, isTrashed = false }) => {
	try {
		return await File.find({
			parent,
			isTrashed,
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

		const checkFileExists = await File.findOne({
			parent,
			name,
		});

		if (checkFileExists) {
			throw new ApiError(
				409,
				`${isFolder ? "Folder" : "File"}  with same name already exists`
			);
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
				`${
					isFolder ? "Folder" : "File"
				}  with same name already exists`,
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

const moveFile = async ({ id, parent }) => {
	try {
		const checkFile = await File.findById(id);

		if (checkFile?.parent.equals(parent)) {
			throw new ApiError(
				400,
				"Destination folder should not be same as the parent folder"
			);
		}
		const file = await File.findByIdAndUpdate(id, {
			parent,
		});

		return file;
	} catch (error) {
		throw error;
	}
};

const copyFile = async ({ id, parent }) => {
	try {
		const checkFile = await File.findById(id).lean();

		if (checkFile?.parent.equals(parent)) {
			throw new ApiError(
				400,
				"Destination folder should not be same as the parent folder"
			);
		}

		delete checkFile?._id;
		const fileName = checkFile?.thumbnailUrl?.split("/").slice(-1)[0];
		const oldThumbnailPath = path.join(THUMBNAIL_DIR, fileName);
		const newFile = await File.create({ ...checkFile, parent });

		const newFileName = `${newFile._id}.png`;
		const newThumbnailPath = path.join(THUMBNAIL_DIR, newFileName);
		fs.copyFileSync(oldThumbnailPath, newThumbnailPath);

		newFile.thumbnailUrl = `${process.env.APP_URL}/thumbnail/${newFileName}`;

		await newFile.save();
		return newFile;
	} catch (error) {
		throw error;
	}
};

const renameFile = async ({ id, name, parent }) => {
	try {
		const checkFileExistsWithName = await File.find({
			name,
			parent,
		});

		if (checkFileExistsWithName?.length > 0) {
			throw new ApiError(409, "File with same name already exists");
		}

		const file = await File.findByIdAndUpdate(id, {
			name,
		});

		return file;
	} catch (error) {
		throw error;
	}
};

const moveToTrash = async ({ id, parent }) => {
	try {
		const file = await File.findByIdAndUpdate(id, {
			isTrashed: true,
		});

		return file;
	} catch (error) {
		throw error;
	}
};

const restoreTrash = async ({ id }) => {
	try {
		const file = await File.findByIdAndUpdate(id, {
			isTrashed: false,
		});

		return file;
	} catch (error) {
		throw error;
	}
};
export default {
	getFiles,
	createFile,
	updateThumbnail,
	moveFile,
	copyFile,
	renameFile,
	moveToTrash,
	restoreTrash,
};
