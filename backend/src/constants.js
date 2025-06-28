import path from "path";

export const __dirname = import.meta.dirname;

export const ACCESS_TOKEN_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
};

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
};

export const THUMBNAIL_DIR = path.join(__dirname, "public", "thumbnail");
export const FILE_UPLOADS_DIR = path.join(__dirname, "storage", "files");
export const TEMP_DIR = path.join(__dirname, "storage", "temp");

export const REQUIRED_DIRS = [THUMBNAIL_DIR, FILE_UPLOADS_DIR, TEMP_DIR];
