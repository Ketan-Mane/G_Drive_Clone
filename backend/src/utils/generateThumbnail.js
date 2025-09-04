import path from "path";
import { THUMBNAIL_DIR } from "../constants.js";
import filepreview from "filepreview-es6";

const generateThumbnail = async (fileId, filePath) => {
	try {
		const fileName = `${fileId}.png`;
		const outputFilePath = path.join(THUMBNAIL_DIR, fileName);
		const options = {
			width: 200,
			height: 200,
			quality: 100,
			pdf: true,
			keepAspect: true,
			page: 1,
			pdf_path: path.resolve("test", "pdfs"),
		};

		const response = await filepreview.generateAsync(
			filePath,
			outputFilePath,
			options
		);

		if (response?.thumbnail) {
			return `${process.env.APP_URL}/thumbnail/${fileName}`;
		}
		return null;
	} catch (error) {
		console.log(error);
		// throw error;
	}
};

export default generateThumbnail;
