import { File } from "../models/file.model.js";
import ApiError from "../utils/ApiError.js";
import generateThumbnail from "../utils/generateThumbnail.js";
import path from "path";
import fs from "fs";
import { THUMBNAIL_DIR } from "../constants.js";
import userService from "./user.service.js";

const getFiles = async ({ parent, isTrashed = false }) => {
	try {
		return await File.find(
			{
				parent,
				isTrashed,
			},
			{
				contentPath: false,
				__v: false,
			}
		);
	} catch (error) {
		throw error;
	}
};

const searchFiles = async ({ search, type, parent }) => {
	try {
		const query = {};

		console.log(type);
		// 🔍 Search by name
		if (search) {
			query.name = { $regex: search, $options: "i" };
		}

		// 📂 Filter by MIME type
		if (type && type !== "all") {
			if (type === "image") query.type = /^image\//;
			else if (type === "video") query.type = /^video\//;
			else if (type === "audio") query.type = /^audio\//;
			else if (type === "document") {
				query.type = {
					$in: [
						"application/pdf",
						"application/msword",
						"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						"application/vnd.ms-excel",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						"application/vnd.ms-powerpoint",
						"application/vnd.openxmlformats-officedocument.presentationml.presentation",
						"text/plain",
					],
				};
			} else if (type === "folder") query.isFolder = true;
		}
		const files = await File.find(query);
		return files;
	} catch (error) {
		throw error;
	}
};

const getSharedWithMeFiles = async ({ user }) => {
	try {
		return await File.find(
			{ sharedWith: user },
			{
				contentPath: false,
				__v: false,
			}
		);
	} catch (error) {
		throw error;
	}
};

const getFileById = async ({ id, excludePath = true }) => {
	try {
		const projection = { __v: 0 }; // always exclude __v

		if (excludePath) {
			projection.contentPath = 0; // exclude contentPath
		}
		const file = await File.findById(id, projection)
			.populate({
				path: "parent",
				select: "name isFolder owner",
			})
			.populate({
				path: "owner",
				select: "firstName lastName email username",
			})
			.populate({
				path: "sharedWith",
				select: "firstName lastName email",
			});
		return file;
	} catch (error) {
		throw error;
	}
};

const createFile = async ({ name, size, owner, parent, isFolder = false, contentPath, type }) => {
	try {
		if (!parent) {
			parent = owner?.rootFolder;
		}

		const file = await File.create({
			name,
			size,
			owner,
			parent,
			isFolder,
			contentPath,
			type,
		});

		return file;
	} catch (error) {
		if (error.code === 11000) {
			throw new ApiError(409, `${isFolder ? "Folder" : "File"}  with same name already exists`, null, null);
		}
		throw error;
	}
};

const updateThumbnail = async ({ id, file }) => {
	try {
		const downloadUrl = `${process.env.APP_URL}/api/files/download/${id}`;
		const previewUrl = `${process.env.APP_URL}/api/files/preview/${id}`;

		const thumbnailUrl = await generateThumbnail(id, file.path);
		const updatedFile = await File.findByIdAndUpdate(id, {
			thumbnailUrl,
			downloadUrl,
			previewUrl,
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
			throw new ApiError(400, "Destination folder should not be same as the parent folder");
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
			throw new ApiError(400, "Destination folder should not be same as the parent folder");
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

const moveToTrash = async ({ id, user, parent }) => {
	try {
		const checkPermission = await File.findById(id);
		if (!checkPermission?.owner.equals(user?._id)) {
			return await removeFileAccess({ user: user?._id, id });
		}

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

const deleteFile = async ({ id }) => {
	try {
		const file = await File.findByIdAndDelete(id);
		if (file?.isFolder) {
			const thumbnailPath = path.join(THUMBNAIL_DIR, `${file?._id}.png`);
			const filePath = path.join(file?.contentPath);
			if (fs.existsSync(thumbnailPath)) {
				fs.unlinkSync(thumbnailPath);
			}
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		}
	} catch (error) {
		throw error;
	}
};

const shareFile = async ({ email, id }) => {
	try {
		const user = await userService.getUserByEmailOrUsername(email);
		const file = await File.findByIdAndUpdate(id, {
			$addToSet: { sharedWith: user },
		});

		return file;
	} catch (error) {
		throw error;
	}
};

const removeFileAccess = async ({ user, id }) => {
	try {
		const file = await File.findByIdAndUpdate(id, {
			$pull: { sharedWith: user },
		});
		return file;
	} catch (error) {
		throw error;
	}
};

export default {
	getFiles,
	searchFiles,
	getSharedWithMeFiles,
	getFileById,
	createFile,
	updateThumbnail,
	moveFile,
	copyFile,
	renameFile,
	moveToTrash,
	restoreTrash,
	deleteFile,
	shareFile,
	removeFileAccess,
};
