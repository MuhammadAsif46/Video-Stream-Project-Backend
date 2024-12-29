import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../../models/tweet/tweet.model.js"
import {User} from "../../models/user.model.js"
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from "../../utils/ApiResponse.js"
import {asyncHandler} from "../../utils/asyncHandler.js"


export const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})