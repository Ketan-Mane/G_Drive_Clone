import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", AuthRouter);
app.use(errorHandler);

export { app };
