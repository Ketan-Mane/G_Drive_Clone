import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Video Title is required"],
		},
		description: {
			type: String,
			required: true,
		},
		videoFile: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			require: true,
		},
		views: {
			type: Number,
			min: 0,
			default: 0,
		},
		duration: {
			type: Number,
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export const Video = mongoose.model("Video", videoSchema);
