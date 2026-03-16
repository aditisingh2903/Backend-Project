import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = async (req, res) => {
    console.log("Controller hit 🔥");

    return res.status(200)
}


export { registerUser }