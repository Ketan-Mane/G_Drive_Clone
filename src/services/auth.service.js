import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const createUser = async ({
	username,
	email,
	firstName,
	lastName,
	password,
	avatar,
}) => {
	try {
		const isUserExists = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (isUserExists) {
			throw new ApiError(
				400,
				"User with email or username already exists",
				null,
				null
			);
		}

		const newUser = await User.create({
			username,
			email,
			firstName,
			lastName,
			password,
			avatar,
		});
		const user = await User.findById(newUser.id);

		return user;
	} catch (error) {
		throw error;
	}
};

const loginUser = async ({ email, password }) => {
	try {
		const user = await User.findOne({
			$or: [{ email }, { username: email }],
		}).select("password");

		if (!user) {
			throw new ApiError(400, "Invalid credentials", null);
		}

		const isMatch = await user.isPasswordCorrect(password);
		if (!isMatch) {
			throw new ApiError(400, "Invalid credentials", null);
		}

		const loggedInUser = await User.findById(user.id);
		const token = await loggedInUser.generateAccessToken();

		return { user: loggedInUser, token };
	} catch (error) {
		throw error;
	}
};

export default { createUser, loginUser };
