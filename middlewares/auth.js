import {ApiError, asyncHandler} from '../utils/functions.js'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.js'

export const verifyJWT = asyncHandler(async(req,res,next) => {
    try{const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    if(!accessToken){
        throw new ApiError(401,"Unauthorized request.")
    }
    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(401,"Invalid access token.")
    }
    req.user = user;
    next()}catch(error){
        throw new ApiError(401,"Invalid access token.")
    }
})