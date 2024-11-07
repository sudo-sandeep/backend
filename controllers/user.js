import { ApiError, ApiResponse, asyncHandler } from "../utils/functions.js"
import {User} from '../models/user.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access token and refresh token!")
    }
}
 
export const LOGIN = asyncHandler(async(req,res,next)=>{
    const {email,username,password} = req.body;
    if(!(email || username)){
        throw new ApiError(400, "Email or username is required.")
    }
    if(email && !email.trim()){
        throw new ApiError(400,"Email is required.")
    }
    if(username && !username.trim()){
        throw new ApiError(400,"Username is required.")
    }
    if(!password.trim()){
        throw new ApiError(400,"Password is required.")
    }
    const existedUser = await User.findOne({$or:[{email},{username}]});
    if(!existedUser){
        throw new ApiError(400,"Invalid Credantials!");
    }
    const isPasswordCorrect = await existedUser.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid Credantials!");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(existedUser._id);
    const data = {
        username:existedUser.username,
        email:existedUser.email,
    }
    const options = {
        httpOnly:true,
        secure:true,
    }
    res
    .status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(new ApiResponse(200,data,"User logged in successfully."))
})

export const SIGNUP = asyncHandler(async(req,res,next)=>{
    const {email,password,username} = req.body;
    if(!email.trim()){
        throw new ApiError(400,"Email is required.")
    }
    if(!password.trim()){
        throw new ApiError(400,"Password is required.")
    }
    if(!username.trim()){
        throw new ApiError(400,"Username is required.")
    }
    const existedUser = await User.findOne({$or:[{email:email,username:username}]})
    if(existedUser){
        throw new ApiError(409,"User with email or username already exist.")
    }
    const user = await User.create({username:username,email:email,password:password})
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        return ApiError(400,"Something went wrong while registering the user.")
    }
    return res.status(201).json(new ApiResponse(200,createdUser,"User created successfully."))
})

export const LOGOUT = asyncHandler(async(req,res,next)=>{
    try {
        const userId = req.user?._id
        await User.findByIdAndUpdate(userId,{
            $set:{
                refreshToken:null
            }
        })
        const options = {
            httpOnly:true,
            secure:true,
        }
        res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logout successfully.")) 
    } catch (error) {
        throw new ApiError(400,"Something went wrong while logout user.")
    }
})

export const REFRESH_TOKEN = asyncHandler(async(req,res,next)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request.")
    }
    const decoded = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded?._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token.")
    }
    if(user.refreshToken!==incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request.")
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const options = {
        httponly:true,
        secure:true
    }

    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{},"Access has been increased!"))
})