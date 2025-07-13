import axiosInstance from "@/services/apiClient";

export const getFiles = async () => {
	const { data } = await axiosInstance.get("/files");
	const { files } = data.data;
	return files;
};

export const createFolder = async (payload) => {
	const { data } = await axiosInstance.post("/files/folder", payload);
	return data;
};
