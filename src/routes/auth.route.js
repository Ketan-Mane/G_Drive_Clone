import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import {
	validateRegisterUser,
	validateLoginUser,
} from "../validators/user.validator.js";
const router = Router();

router.route("/register").post(validateRegisterUser, registerUser);
router.route("/login").post(validateLoginUser, loginUser);
export default router;