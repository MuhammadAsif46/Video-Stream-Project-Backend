import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";

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

const updateUserAvatar = asyncHandler(async (req, res) => {
  // req.file -> avatar file
  // find user by id
  // update user avatar
  // return response

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(500, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true,}
  ).select("-password");

  return res
   .status(200)
   .json(new ApiResponse(200, "Avatar updated successfully", user));

});


const updateUserCoverImage = asyncHandler(async (req, res) => {
  // req.file -> coverImage file
  // find user by id
  // update user avatar
  // return response

  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(500, "Error while uploading on coverImage");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true,}
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, "Cover image updated successfully", user));

});

export { updateUserDetails, updateUserAvatar, updateUserCoverImage };
