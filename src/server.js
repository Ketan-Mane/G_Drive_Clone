import { configDotenv } from "dotenv";
import { app } from "./app.js";
import http from "http";
import { connectDB } from "./db/connection.js";
configDotenv({
	path: "./.env",
});

connectDB()
	.then(() => {
		const server = http.createServer(app);
		server.listen(process.env.PORT || 3000, () => {
			console.log("Server Started at : ", server.address().port);
		});
	})
	.catch((error) => {
		console.log("Error : ", error);
	});
