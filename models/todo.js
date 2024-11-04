import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        min:[3, "Title should be at least 3 characters"],
        max:[20, "Title should be at most 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        min:[3, "Description should be at least 3 characters"],
        max:[100, "Description should be at most 100 characters"]
    },
    status: {
        type: String,
        enum: ["pending","completed"],
        default: "pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{ timestamps: true })

todoSchema.plugin(mongooseAggregatePaginate)

export const Todo = mongoose.model("Todo", todoSchema)