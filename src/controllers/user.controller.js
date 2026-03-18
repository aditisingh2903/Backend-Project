import { asyncHandler } from "../utils/asyncHandler.js";
import {apierror} from "../utils/apiError.js";


const registerUser = asyncHandler(async (req, res) => {
    console.log("Controller hit 🔥");
    //get user details from frontend
    // validation - not empty
    //check if user already exists (unique email, username)
    //check fro images, check for avatar
    //upload image to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token fields from response
    //check for user creation 
    //return response
    


    const {fullName, email, password, username} = req.body // get user details from frontend
    console.log("email", email);

    if ([fullName, email, password, username].some(field => !field || field.trim() === "")) //.some returns true or false
        {  
        throw new apierror("Full name is required", 400);
        }

    const existedUser = User.findOne({
        $or: [
            { email },
            { username }]
    })
    if (existedUser){
        throw new apierror("User already exists with this email or username", 409);
    }
}) 


export { registerUser }