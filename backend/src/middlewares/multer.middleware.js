import multer, { diskStorage } from "multer";
import { TEMP_DIR } from "../constants.js";

const storage = diskStorage({
	destination: function (req, file, cb) {
		cb(null, TEMP_DIR);
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

export const upload = multer({
	storage,
});
