import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiError } from "../../../utils/ApiError.js";
import { User } from "../../../models/user/user.model.js";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: email, username
  // check for images. check for avatar
  // upload tem to cloudinary avatar
  // create user object - craete entry in DB
  // remove password and refresh toke field from response
  // check for user creation
  // return response

  const { username, email, fullname, password } = req.body;

  // TODO: implement registration logic here

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Email or Username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const createUser = await User.create({
    username: username.toLowerCase(),
    email,
    fullname,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // by default all select add (-)Sign unselect field:
  const checkUserById = await User.findById(createUser._id).select(
    "-password -refreshToken"
  );

  if (!checkUserById) {
    throw new ApiError("Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered successfully", createUser));
});

export { registerUser };
