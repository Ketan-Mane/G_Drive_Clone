import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";
import { validateRegisterUser, validateLoginUser } from "../validators/user.validator.js";

const router = Router();

router.route("/register").post(validateRegisterUser, authController.registerUser);
router.route("/login").post(validateLoginUser, authController.loginUser);
router.route("/logout").post(authMiddleware, authController.logoutUser);
router.route("/me").post(authMiddleware, authController.verifyLoggedInUser);
router.route("/me").put(authMiddleware, authController.updateUser);
router.route("/update-password").put(authMiddleware, authController.updatePassword);
router.route("/refresh-token").post(authController.refreshAccessToken);

export default router;
