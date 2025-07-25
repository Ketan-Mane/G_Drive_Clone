import axiosInstance from "@/services/apiClient";

export const getFiles = async (parent) => {
	const { data } = await axiosInstance.get(`/files/${parent}`);
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

export const updateFile = async ({ id, payload }) => {
	const { data } = await axiosInstance.patch(`/files/${id}`, payload);
	return data;
};
