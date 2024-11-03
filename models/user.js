import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min:[6, "Password should be atleast 6 characters"],
        max:[20, "Password should be atmost 20 characters"]
    }
},{timestamps: true})

export const User = mongoose.model("User", userSchema)