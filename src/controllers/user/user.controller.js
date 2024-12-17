import { asyncHandler } from "../../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    // success: true,
    // message: "User registered successfully"
    message: "Ok",
  });
});


export { registerUser };