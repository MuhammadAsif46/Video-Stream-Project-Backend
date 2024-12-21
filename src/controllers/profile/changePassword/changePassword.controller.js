import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import {User} from "../../../models/user/user.model.js"

const changePasssword = asyncHandler(async (req, res) => {

    // req.body -> data
    // find user by id
    // validate old password
    // change password
    // return response

    const {oldPassword, newPassword} = req.body

    // if agr need to check new password OR confirm password check condition:
    // const {oldPassword, newPassword,confirmPassword} = req.body
    // if (newPassword !== confirmPassword) {
    //     throw new ApiError(400, "Passwords do not match");
    // }
    
    const user = User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old Password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: true});

    return res
      .status(200)
      .json(new ApiResponse(200,"Password Changed Successfully",{}));

});

export { changePasssword };
