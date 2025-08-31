import multer, { diskStorage } from "multer";
import { FILE_UPLOADS_DIR, TEMP_DIR } from "../constants.js";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = diskStorage({
	destination: function (req, file, cb) {
		cb(null, FILE_UPLOADS_DIR);
	},
	filename: function (req, file, cb) {
		const extn = path.extname(file.originalname);
		const uniqueFileName = uuid() + extn;
		cb(null, uniqueFileName);
	},
});

export const upload = multer({
	storage,
});
