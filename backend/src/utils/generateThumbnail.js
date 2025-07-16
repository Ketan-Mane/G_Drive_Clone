import sharp from "sharp";
import path, { resolve } from "path";
import mime from "mime-types";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffprobePath from "@ffprobe-installer/ffprobe";
import { THUMBNAIL_DIR } from "../constants.js";

ffmpeg.setFfmpegPath(ffmpegPath.path);
ffmpeg.setFfprobePath(ffprobePath.path);

const generateImageThumbnail = async (id, filePath) => {
	try {
		const outputFileName = `${id}.png`;
		const outputFilePath = path.join(THUMBNAIL_DIR, outputFileName);
		await sharp(filePath)
			.resize({
				width: 200,
				height: 200,
				fit: "cover",
			})
			.png({
				quality: 80,
			})
			.toFile(outputFilePath);

		return `${process.env.APP_URL}/thumbnail/${outputFileName}`;
	} catch (error) {
		throw error;
	}
};

const generateVideoThumbnail = async (id, filePath) => {
	try {
		const outputFileName = `${id}.png`;
		ffmpeg(filePath)
			.on("end", () => {
				console.log("Thumbnail generated!");
			})
			.on("error", (err) => {
				console.error("Error:", err);
			})
			.screenshots({
				count: 1,
				filename: outputFileName,
				folder: THUMBNAIL_DIR,
				size: "200x200",
			});

		return `${process.env.APP_URL}/thumbnail/${outputFileName}`;
	} catch (error) {
		throw error;
	}
};

const generatePdfThumbnail = async (fileId, filePath) => {
	try {
		const outputFileName = `${id}.png`;
		const outputFilePath = path.join(THUMBNAIL_DIR, outputFileName);

		const converter = fromPath(pdfPath, {
			density: 100,
			saveFilename: outputFileName,
			savePath: outputFilePath,
			format: "png",
			width: 200,
			height: 200,
		});
		const page = await converter(1); // First page
		return `${process.env.APP_URL}/thumbnail/${outputFileName}`;
	} catch (error) {}
};

const generateThumbnail = async (fileId, filePath) => {
	try {
		const mimeType = mime.lookup(filePath);
		console.log(mimeType);

		if (mimeType.startsWith("image/")) {
			return await generateImageThumbnail(fileId, filePath);
		} else if (mimeType === "application/mp4") {
			return await generateVideoThumbnail(fileId, filePath); // fallback placeholder
		} else if (mimeType === "application/pdf") {
			return await generatePdfThumbnail(fileId, filePath);
		} else {
			throw new Error("Unsupported file type for thumbnail generation.");
		}
	} catch (error) {
		throw error;
	}
};

export default generateThumbnail;
