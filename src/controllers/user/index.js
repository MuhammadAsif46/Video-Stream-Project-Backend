import { refreshAccessToken } from "./accessToken/accessToken.controller.js";
import { changePassword } from "./change-password/change-password.controller.js";
import { getCurrentUser } from "./get-user/get-user.controller.js";
import { loginUser } from "./login-user/login-user.controller.js";
import { logout } from "./logout/logout.controller.js";
import { registerUser } from "./register-user/register-user.controller.js";
import {
  updateUserDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "./update-user/update-user.controller.js";
import { getUserWatchHistory } from "./watch-history/watch-history.controller.js";
import { getUserChannelProfile } from "./user-channel-profile/user-channel-profile.controller.js";

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
  getUserChannelProfile,
};
