import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const getUserById = async (id) => {
	const user = await User.findById(id);
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	return user;
};

export default { getUserById };
