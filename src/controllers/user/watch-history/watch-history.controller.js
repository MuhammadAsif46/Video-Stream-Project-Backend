import {asyncHandler} from "../../../utils/asyncHandler.js"
import {ApiError} from "../../../utils/ApiError.js"
import {ApiResponse} from "../../../utils/ApiResponse.js"
import {User} from "../../../models/user/user.model.js"
import mongoose from "mongoose";

const getUserWatchHistory = asyncHandler(async(req,res) => {
    const user = await User.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"videos",
                localFields:"watchHistory",
                foreignFields:"_id",
                as:"watchHistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localFields:"owner",
                            foreignFields:"_id",
                            as:"owner",
                        }
                    }
                ]
            }
        }
    ])
});

export {getUserWatchHistory}