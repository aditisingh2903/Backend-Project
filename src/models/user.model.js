import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" // ek bearer token h jo usko bear karta h wo sahi man lete h ham

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true  // jab bhi searching enable krni hai uska index true kr do
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true
        },
        coverImage: {
            type: String //cloudinary url
        },
        watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']   
    },
    refreshToken: {
        type: String
    },
    
    timestamps: true,
})


userSchema.pre("save", async function (next) {   //bcrypt se password hash krte h 
    if(this.isModified("password")) return next();  //agar modify hua h tabhi

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id, 
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            avatar: this.avatar
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id  // bar bar refresh hota isliye sirf id hi bhejte h taki security badh jaye aur agar kisi ke pass refresh token chala jata h to wo uska access token generate ni kr payega kyunki usme id hi ni hogi
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)