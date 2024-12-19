import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { User } from "../../../models/user/user.model.js";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // validation nhi lagao bss sedha jaky save krdo mje pta hai me kia kraha hn.
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // login user ? -> username or email
  // find the user
  // password check
  // access and refresh token
  // send cookies
  // return response

  const { email, username, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username or email is required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!existedUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existedUser._id
  );
});

export { loginUser };
