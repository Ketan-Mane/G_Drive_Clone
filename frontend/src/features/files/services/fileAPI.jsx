import axiosInstance from "@/services/apiClient";

export const getFiles = async () => {
	const { data } = await axiosInstance.get("/files");
	const { files } = data.data;
	return files;
};

export const uploadFile = async ({ file, parent_id }) => {
	const form = new FormData();
	form.append("file", file);
	const {} = await axiosInstance.post("/files", form, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const createFolder = async (payload) => {
	const { data } = await axiosInstance.post("/files/folder", payload);
	return data;
};
