import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import FileRouter from "./routes/file.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import { setupDirectries } from "./utils/setupDirectories.js";
import path from "path";
import { __dirname } from "./constants.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

setupDirectries();
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", AuthRouter);
app.use("/api", authMiddleware);
app.use("/api/files", FileRouter);

app.use(errorHandler);

export { app };
