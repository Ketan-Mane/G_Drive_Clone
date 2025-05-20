import { body } from "express-validator";

export const validateRegisterUser = [
	body("username").notEmpty().withMessage("Username is required"),
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.bail()
		.isEmail()
		.withMessage("Invalid email"),
	body("firstName").notEmpty().withMessage("First Name is required"),
	body("avatar").notEmpty().withMessage("Avatar is required"),
	body("password").notEmpty().withMessage("Password is required"),
];

export const validateLoginUser = [
	body("email").notEmpty().withMessage("Email is required"),
	body("password").notEmpty().withMessage("Password is required"),
];
