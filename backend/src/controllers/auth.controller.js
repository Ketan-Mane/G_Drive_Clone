import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);
	if (!errors.isEmpty()) {
		return res.status(400).json(new ApiResponse(400, { errors: errors.mapped() }, "Invalid data"));
	}

	const { email, firstName, lastName, password, avatar } = req.body;

	const user = await authService.registerUser({ email, firstName, lastName, password, avatar });

	return res.status(201).json(new ApiResponse(201, user, "Registered Successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);

	if (!errors.isEmpty()) {
		return res.status(400).json(new ApiResponse(400, { errors: errors.mapped() }, null));
	}

	const { email, password } = req.body;

	const { user, accessToken, refreshToken } = await authService.loginUser({
		email,
		password,
	});

	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
	};

	res.cookie("auth_token", accessToken, options);
	res.cookie("auth_r_token", refreshToken, options);
	return res.status(200).json(new ApiResponse(200, { user, accessToken, refreshToken }, "Login Successfull"));
});

const logoutUser = asyncHandler(async (req, res) => {
	try {
		const user = req.user;
		await User.findByIdAndUpdate(user.id, {
			$set: {
				refreshToken: undefined,
			},
		});

		return res
			.status(200)
			.clearCookie("auth_token")
			.clearCookie("auth_r_token")
			.json(new ApiResponse(200, null, "User logged out successfully."));
	} catch (error) {
		throw new ApiError(500, "Something went wrong on logout");
	}
});

const verifyLoggedInUser = asyncHandler(async (req, res) => {
	const user = req.user;

	if (!user) {
		new ApiError(401, "Session expired. Please login again");
	}

	return res.status(200).json(new ApiResponse(200, { user }, null));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
	try {
		const clientRefreshToken = req.cookies.auth_r_token || req.header("Authorization")?.replace("Bearer ", "");

		if (!clientRefreshToken) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(clientRefreshToken, process.env.JWT_SECRET);

		const user = await User.findById(decodedToken?.id).select("+refreshToken");

		if (clientRefreshToken !== user?.refreshToken || !user) {
			throw new ApiError(401, "Invalid refresh token");
		}

		const { accessToken, refreshToken } = await authService.generateAccessAndRefreshToken(decodedToken?.id);

		return res.status(200).json(new ApiResponse(200, { accessToken, refreshToken }));
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid refresh token");
	}
});

export const updateUser = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const { email, firstName, lastName } = req.body;

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ email, firstName, lastName },
		{ new: true, runValidators: true }
	);
	return res.status(200).json(new ApiResponse(200, { user: updatedUser }, "Profile updated successfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const { currentPassword, newPassword } = req.body;

	const user = await User.findById(userId).select("password");
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	const isMatch = await user.isPasswordCorrect(currentPassword);

	if (!isMatch) {
		throw new ApiError(401, "Current password is incorrect");
	}

	user.password = newPassword;
	await user.save();

	return res.status(200).json(new ApiResponse(200, null, "Password updated successfully"));
});

export default {
	registerUser,
	loginUser,
	logoutUser,
	verifyLoggedInUser,
	refreshAccessToken,
	updateUser,
	updatePassword,
};
