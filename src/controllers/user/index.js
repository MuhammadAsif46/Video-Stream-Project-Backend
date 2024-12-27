import { refreshAccessToken } from "./accessToken/accessToken.controller.js";
import { changePassword } from "./changePassword/changePassword.controller.js";
import { getCurrentUser } from "./getUser/getUser.controller.js";
import { loginUser } from "./loginUser/loginUser.controller.js";
import { logout } from "./logout/logout.controller.js";
import { registerUser } from "./registerUser/registerUser.controller.js";
import {
  updateUserDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "./updateUser/updateUser.controller.js";
import { getUserWatchHistory } from "./watch-history/watch-history.controller.js";

export {
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  loginUser,
  logout,
  registerUser,
  updateUserDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserWatchHistory,
};
