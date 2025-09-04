import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const getFileCategory = (mimeType) => {
	if (!mimeType) return "unknown";

	if (mimeType.startsWith("image/")) return "Image";
	if (mimeType === "application/pdf") return "PDF";
	if (mimeType.startsWith("video/")) return "Video";
	if (mimeType.startsWith("audio/")) return "Audio";

	if (
		mimeType === "application/msword" ||
		mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	) {
		return "Word";
	}

	if (
		mimeType === "application/vnd.ms-excel" ||
		mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	) {
		return "Excel";
	}

	return "Other";
};

export function stringToColor(str) {
	if (!str) return;
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 70%, 40%)`;
}
