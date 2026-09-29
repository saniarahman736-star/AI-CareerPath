import User from "../model/Usermodel.js";
export const getProfile=async(req,res)=>{
    try{
      const user=await User.findById(req.user.userId).select("-password");
      res.status(200).json({
        message:"Profile completion successful",
      })
    }catch(error){
       res.status(500).json({
        message:"Server error",
        error:error.message,
       })
    }
}