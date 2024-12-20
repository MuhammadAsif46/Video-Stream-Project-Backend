import { User } from "../../models/user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

      console.log("token->", token);
      
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("docoded token-->", decodeToken);
        
    const user = await User.findById(decodeToken?.id).select(
      "-password -refreshToken"
    );

        console.log("user--->", user);
        
    if (!user) {
      // todo: discussion about frontend
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user
    next()
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
});

export { verifyJWT };
