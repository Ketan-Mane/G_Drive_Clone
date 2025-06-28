import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const CONNECTION_URL = `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`;
		const connectionInstance = await mongoose.connect(CONNECTION_URL);
		console.log(
			"MONGODB connected to : ",
			connectionInstance.connection.host
		);
	} catch (error) {
		console.error("Mongo Connection ERROR : ", error);
		process.exit(1);
	}
};

export { connectDB };
