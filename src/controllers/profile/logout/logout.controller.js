import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { User } from "../../../models/user/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const logout = asyncHandler(async (req, res) => {
  
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200,"User Logout Successfully",{}))
});
