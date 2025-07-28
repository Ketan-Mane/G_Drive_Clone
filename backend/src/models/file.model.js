import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "File name is required"],
		},
		isFolder: { type: Boolean, default: false },
		isTrashed: { type: Boolean, default: false },
		isStarred: { type: Boolean, default: false },
		owner: { type: Schema.Types.ObjectId, ref: "User" },
		icon: { type: String, required: [false, "File icon is required"] },
		size: { type: Number, required: [true, "File size is required"] },
		thumbnailUrl: { type: String },
		parent: { type: Schema.Types.ObjectId, ref: "File", default: null },
		downloadUrl: {
			type: String,
			required: [true, "Download url is required"],
		},
		previewUrl: {
			type: String,
			required: [true, "Preview url is required"],
		},
		hasFolders: { type: Boolean, default: false },
		breadcrumb: { type: String, default: null },
	},
	{
		timestamps: true,
	}
);

export const File = mongoose.model("File", fileSchema);
