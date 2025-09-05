import axiosInstance from "@/services/apiClient";
import axios from "@/services/apiClient";

const register = async (payload) => {
	try {
		const { data, status } = await axios.post("/auth/register", payload);
		if (data.success && status === 201) {
			return data;
		}
		return null;
	} catch (error) {
		throw error;
	}
};

const login = async (payload) => {
	try {
		const { data, status } = await axios.post("/auth/login", payload);
		if (data.success && status === 200) {
			return data;
		}
		return null;
	} catch (error) {
		throw error;
	}
};

const getCurrentUser = async () => {
	try {
		const { data, status } = await axios.post("/auth/me");
		if (data.success && status === 200) {
			return data?.data?.user;
		}
		return null;
	} catch (error) {
		throw error;
	}
};

const logout = async () => {
	try {
		const { data, status } = await axios.post("/auth/logout");
		return data.success && status === 200;
	} catch (error) {
		console.error("Logout error:", error);
		return false;
	}
};

const updateUser = async ({ user }) => {
	try {
		const { data, status } = await axiosInstance.put("/auth/me", { ...user });
		const { user: updatedUser } = data.data;
		return updatedUser;
	} catch (error) {
		return false;
	}
};

const updatePassword = async ({ currentPassword, newPassword }) => {
	try {
		const { data, status } = await axiosInstance.put("/auth/update-password", { currentPassword, newPassword });
		return data;
	} catch (error) {
		throw error;
	}
};

export { register, login, getCurrentUser, logout, updateUser, updatePassword };
