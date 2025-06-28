import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import fileService from "./file.service.js";

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);

		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save();

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			error.message ||
				"Something went wrong during access and refresh token generate",
			null
		);
	}
};

const registerUser = async ({
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

		const rootFolder = await fileService.createFile({
			name: newUser?._id,
			owner_id: newUser._id,
			isFolder: true,
			size: 0,
		});

		newUser.rootFolder = rootFolder?._id;
		await newUser.save();
		const user = await User.findById(newUser._id);

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

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user._id);

		const loggedInUser = await User.findById(user.id);

		return { user: loggedInUser, accessToken, refreshToken };
	} catch (error) {
		throw error;
	}
};

export default { registerUser, loginUser, generateAccessAndRefreshToken };
