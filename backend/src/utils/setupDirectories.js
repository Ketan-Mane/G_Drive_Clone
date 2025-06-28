import { REQUIRED_DIRS } from "../constants.js";
import fs from "fs";

export const setupDirectries = async () => {
	try {
		REQUIRED_DIRS.forEach((dir) => {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
		});
	} catch (error) {
		throw error;
	}
};
