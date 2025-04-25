import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			lowercase: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: [true, "First Name is required"],
			minLength: 2,
		},
		lastName: {
			type: String,
		},
		avatar: {
			type: String,
			required: [true, "Avatar is required"],
		},
		coverImage: {
			type: String,
		},
		watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		fullName: this.firstName + this.lastName,
	});
};

export const User = mongoose.model("User", userSchema);