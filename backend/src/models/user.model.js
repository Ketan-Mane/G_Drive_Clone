import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
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
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
		refreshToken: {
			type: String,
			select: false,
		},
		rootFolder: {
			type: Schema.Types.ObjectId,
			ref: "File",
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
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			fullName: this.firstName + " " + this.lastName,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1d",
		}
	);
};

userSchema.methods.generateRefreshToken = async function () {
	return jwt.sign(
		{
			id: this._id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1d",
		}
	);
};

export const User = mongoose.model("User", userSchema);
