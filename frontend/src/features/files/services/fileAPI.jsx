import axiosInstance from "@/services/apiClient";

export const getFiles = async (parent) => {
	const { data } = await axiosInstance.get(`/files/${parent}`);
	const { files } = data.data;
	return files;
};

export const getTrashedFiles = async (parent) => {
	const { data } = await axiosInstance.get(`/files/${parent}/trash`);
	const { files } = data.data;
	return files;
};

export const uploadFile = async ({ file, parent_id }) => {
	const form = new FormData();
	form.append("file", file);
	if (parent_id) {
		form.append("parent_id", parent_id);
	}
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

export const copyOrMoveFile = async ({ id, payload }) => {
	const { data } = await axiosInstance.patch(`/files/${id}`, payload);
	return data;
};

export const moveToTrash = async ({ id, payload }) => {
	const { data } = await axiosInstance.patch(`/files/${id}`, payload);
	return data;
};

export const deleteFile = async ({ id }) => {
	const { data } = await axiosInstance.delete(`/files/${id}`);
	return data;
};
