import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logout,
  getCurrentUser,
  changePassword,
  updateUserAvatar,
  updateUserDetails,
  updateUserCoverImage,
  getUserWatchHistory,
  getUserChannelProfile,
} from "../../controllers/user/index.js";
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
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
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
