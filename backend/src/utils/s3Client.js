import dotenv from "dotenv";
dotenv.config();
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
});

const bucketName = process.env.AWS_BUCKET_NAME;

const getUploadUrl = async (fileName, fileType) => {
	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: fileName,
		ContentType: fileType,
	});

	return getSignedUrl(s3, command, { expiresIn: 300 });
};

const getFileContent = async (Key) => {
	const command = new GetObjectCommand({
		Bucket: bucketName,
		Key,
	});

	return await s3.send(command);
};

export default { getUploadUrl, getFileContent };
