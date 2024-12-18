import { Router } from "express";
import { registerUser } from "../../controllers/user/user.controller.js";
import { upload } from "../../middlewares/multer/multer.middleware.js";

const router = Router();

// router.post("/register",upload.fields() ,registerUser) 1st syntax
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
); // 2nd syntax

export default router;
