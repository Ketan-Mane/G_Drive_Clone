import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import fileController from "../controllers/file.controller.js";

const router = Router();

router.route("/").get(authMiddleware, fileController.getFiles);
router
	.route("/")
	.post(authMiddleware, upload.single("file"), fileController.createFile);

router.route('/folder').post(authMiddleware, fileController.createFolder);

export default router;
