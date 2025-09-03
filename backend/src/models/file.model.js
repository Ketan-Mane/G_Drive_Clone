import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "File name is required"],
		},
		owner: { type: Schema.Types.ObjectId, ref: "User" },
		type: { type: String },
		icon: { type: String, required: [false, "File icon is required"] },
		size: { type: Number, required: [true, "File size is required"] },
		thumbnailUrl: { type: String },
		parent: { type: Schema.Types.ObjectId, ref: "File", default: null },
		downloadUrl: { type: String },
		previewUrl: { type: String },
		contentPath: { type: String },
		hasFolders: { type: Boolean, default: false },
		breadcrumb: { type: String, default: null },
		isFolder: { type: Boolean, default: false },
		isTrashed: { type: Boolean, default: false },
		sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
		isStarred: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

export const File = mongoose.model("File", fileSchema);
