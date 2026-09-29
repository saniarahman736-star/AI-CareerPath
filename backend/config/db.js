import mongoose from "mongoose";
const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("MONGODB Connected Successfully");
    }catch(error){
        console.error("MONGODB Connection Failed:",error.message);
        process.exit(1);
    }
};
export default connectDB;