import { Router } from "express";
import { registerUser } from "../../controllers/auth/registerUser/registerUser.controller.js";
import { loginUser } from "../../controllers/auth/loginUser/loginUser.controller.js";
import { refreshAccessToken } from "../../controllers/user/accessToken/accessToken.controller.js";
import { logout } from "../../controllers/profile/logout/logout.controller.js";
import { upload } from "../../middlewares/multer/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth/auth.middleware.js";
import { getCurrentUser } from "../../controllers/user/getUser/getUser.controller.js";
import { changePasssword } from "../../controllers/profile/changePassword/changePassword.controller.js";
import {
  updateUserAvatar,
  updateUserDetails,
  updateUserCoverImage,
} from "../../controllers/user/updateUser/updateUser.controller.js";
import { getUserChannelProfile } from "../../controllers/channel-profile/channel-profile.controller.js";
import { getUserWatchHistory } from "../../controllers/user/watch-history/watch-history.controller.js";

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
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePasssword);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserDetails);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/history").get(verifyJWT, getUserWatchHistory);
export default router;
