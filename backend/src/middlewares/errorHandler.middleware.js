import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = async (error, req, res, next) => {
	if (error instanceof ApiError) {
		const { statusCode, message, errors } = error;
		return res
			.status(statusCode)
			.json(new ApiResponse(statusCode, errors, message));
	}

	console.log("Stack Trace : ", error.stack);
	return res
		.status(500)
		.json(
			new ApiResponse(
				500,
				null,
				error?.message || "Internal Server Error"
			)
		);
};

export default errorHandler;
