import axiosInstance from "@/services/apiClient";

export const getFiles = async (folder) => {
	const { data } = await axiosInstance.get(`/files/folders/${folder}`);
	const { files } = data.data;
	return files;
};

export const getTrashedFiles = async () => {
	const { data } = await axiosInstance.get("/files/trash");
	const { files } = data.data;
	return files;
};

export const getFile = async (id) => {
	const { data } = await axiosInstance.get(`/files/${id}`);
	const { file } = data?.data;
	return file;
};

export const searchFiles = async ({ queryKey }) => {
	const [_key, { search, type }] = queryKey;

	const url = new URLSearchParams();
	if (search) url.append("search", search);
	if (type) url.append("type", type);

	const { data } = await axiosInstance.get(`/files/search?${url.toString()}`);
	const { files } = data?.data;
	return files;
};

export const uploadFile = async ({ file, parent_id, onProgress }) => {
	const form = new FormData();
	form.append("file", file);
	if (parent_id) {
		form.append("parent_id", parent_id);
	}
	await axiosInstance.post("/files", form, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress: (progressEvent) => {
			if (onProgress) {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				onProgress(percentCompleted);
			}
		},
	});
};

// create new file and get the aws signed url
// export const createFile = async (payload) => {
// 	const { data } = await axiosInstance.post("/files", payload);
// 	return data;
// };

// export const uploadFile = async ({ file, url, onProgress }) => {
// 	const { data } = await axios.put(url, file, {
// 		headers: {
// 			"Content-Type": file.type,
// 		},
// 		onUploadProgress: (progressEvent) => {
// 			if (onProgress) {
// 				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
// 				onProgress(percentCompleted);
// 			}
// 		},
// 	});

// 	return data;
// };

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

export const deleteAllTrashFiles = async () => {
	const { data } = await axiosInstance.delete(`/files/trash/empty`);
	return data;
};

export const shareFile = async (payload) => {
	const { data } = await axiosInstance.put(`/files/share`, { ...payload });
	return data;
};

export const sharedWithMe = async () => {
	const { data } = await axiosInstance.get("/files/shared-with-me");
	const { files } = data?.data || [];
	return files;
};
