import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

import { User } from "../../models/user/user.model.js";

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Username is missing");
  }

  // response set array by default aggrgate pipeline
  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribed", // subscribedTo
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribers",
        },
        channelSubscribedCount: {
          $size: "$subscribed",
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers._id"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullname:1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        email:1,
        subscriberCount: 1,
        channelSubscribedCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "Channel does not exists");
  }


  return res.status(200)
  .json(new ApiResponse(200, "User Channel fetched successfully",channel[0]))

});

export { getUserChannelProfile };
