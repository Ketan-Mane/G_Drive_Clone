import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import userService from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(
				new ApiResponse(
					400,
					{ errors: errors.mapped() },
					"Invalid data"
				)
			);
	}

	const { username, email, firstName, lastName, password, avatar } = req.body;

	const user = await userService.createUser({
		username,
		email,
		firstName,
		lastName,
		password,
		avatar,
	});

	return res
		.status(201)
		.json(new ApiResponse(201, user, "Registered Successfully!"));
});

export const loginUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req).formatWith(({ msg }) => msg);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(new ApiResponse(400, { errors: errors.mapped() }, null));
	}

	const { email, password } = req.body;

	const { user, token } = await userService.loginUser({ email, password });

	res.cookie("auth_token", token);
	return res
		.status(200)
		.json(new ApiResponse(200, { user, token }, "Login Successfull"));
});
