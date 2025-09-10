import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import fileController from "../controllers/file.controller.js";

const router = Router();

router.route("/folders/:id").get(fileController.getFiles);
router.route("/search").get(fileController.searchFiles);
router.route("/trash").get(fileController.getTrashedFiles);
router.route("/shared-with-me").get(fileController.getSharedWithMeFiles);

router.route("/:id").get(fileController.getFile);

router.route("/download/:id").get(fileController.getFiles);
router.route("/preview/:id").get(fileController.previewFile);

router.route("/").post(fileController.createFile);

router.route("/folder").post(fileController.createFolder);
router.route("/:id").patch(fileController.updateFile);
router.route("/:id").delete(fileController.deleteFile);

router.route("/share").put(fileController.shareFile);
export default router;
