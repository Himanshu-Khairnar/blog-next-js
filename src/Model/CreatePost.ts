import { Schema } from "mongoose";
import mongoose from "mongoose";

const blogSchema=new Schema(
    {
        title:String,
        image:String,
        description:String,
        type:String,
        author:String,
        authorImg:String

        
    },{
        timestamps:true,

    }
)
export const Blog = mongoose.models.Blog || mongoose.model("Blog",blogSchema)