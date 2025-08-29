import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import fileController from "../controllers/file.controller.js";

const router = Router();

router.route("/:parent").get(authMiddleware, fileController.getFiles);
router
	.route("/:parent/trash")
	.get(authMiddleware, fileController.getTrashedFiles);
router
	.route("/")
	.post(authMiddleware, upload.single("file"), fileController.createFile);

router.route("/folder").post(authMiddleware, fileController.createFolder);
router.route("/:id").patch(authMiddleware, fileController.updateFile);

export default router;
