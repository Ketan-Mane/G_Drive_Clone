import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import fileController from "../controllers/file.controller.js";

const router = Router();

router.route("/folders/:id").get(authMiddleware, fileController.getFiles);
router.route("/trash").get(authMiddleware, fileController.getTrashedFiles);
router.route("/shared-with-me").get(authMiddleware, fileController.getSharedWithMeFiles);

router.route("/:id").get(authMiddleware, fileController.getFile);

router.route("/download/:id").get(authMiddleware, fileController.getFiles);
router.route("/preview/:id").get(authMiddleware, fileController.previewFile);

router.route("/").post(authMiddleware, upload.single("file"), fileController.createFile);

router.route("/folder").post(authMiddleware, fileController.createFolder);
router.route("/:id").patch(authMiddleware, fileController.updateFile);
router.route("/:id").delete(authMiddleware, fileController.deleteFile);

router.route("/share").put(authMiddleware, fileController.shareFile);

export default router;
