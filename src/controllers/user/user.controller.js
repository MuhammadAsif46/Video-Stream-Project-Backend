import { asyncHandler } from "../../utils/asyncHandler.js";

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
});



export { registerUser };