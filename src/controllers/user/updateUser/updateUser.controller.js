import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";

import { User } from "../../../models/user/user.model.js";

const updateUserDetails = asyncHandler(async (req, res) => {
  // req.body -> data
  // find user by id
  // update user details
  // return response

  const { fullname, email } = req.body;

  if (!fullname || !email) {
    throw new ApiError(400, "Full name and email are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true, runValidators: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", user));
});


export { updateUserDetails };