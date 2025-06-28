import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
	try {
		const token =
			req.cookies.auth_token ||
			req.header("Authorization")?.replace("Bearer ", "");

		console.log("Authmiddleware");

		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		const user = await User.findById(decoded.id);
		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error)
		throw new ApiError(401, error?.message || "Invalid access token");
	}
};
