import { Router } from "express";
import { registerUser } from "../../controllers/auth/registerUser/registerUser.controller.js";
import { loginUser } from "../../controllers/auth/loginUser/loginUser.controller.js";
import { refreshAccessToken } from "../../controllers/user/accessToken/accessToken.controller.js";
import { logout} from "../../controllers/profile/logout/logout.controller.js";
import { upload } from "../../middlewares/multer/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth/auth.middleware.js";

const router = Router();

// router.post("/register",upload.fields() ,registerUser) 1st syntax
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
); // 2nd syntax

router.route("/login").post(loginUser);

// Secure routes:
router.route("/logout").post(verifyJWT,logout);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
