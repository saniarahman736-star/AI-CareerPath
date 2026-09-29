import mongoose from "mongoose";
const jobMatchSchema=new mongoose.Schema(
    {
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
     },
     job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
     },
     matchScore:{
        type:Number,
        required:true,
     },
     matchedSkills:{
        type:[String],
        default:[],
     },
     missingSkills:{
        type:[String],
        default:[],
     },
     reason:{
        type:String,
        default:"",
     },
    },
     {
        timestamps:true,
     }
);
const JobMatch=mongoose.model("Job Match",jobMatchSchema);
export default JobMatch;