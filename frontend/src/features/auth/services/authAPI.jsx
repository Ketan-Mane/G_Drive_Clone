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
			return data;
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

export { register, login, getCurrentUser, logout };
