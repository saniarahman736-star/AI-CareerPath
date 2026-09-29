import Application from "../model/ApplicationModel.js";
export const createApplication=async(req,res)=>{
    try{
     const existingApplication=await Application.findOne({
        user:req.user.userId
     });
     if(existingApplication){
        return res.status(400).json({
            message:"Application already exists.Please edit your profile."
        });
     }
     const application=await Application.create({
        user:req.user.userId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        degree:req.body.degree,
        branch:req.body.branch,
        college:req.body.college,
        skills:req.body.skills,
        internship:req.body.internship,
        internshipDuration:req.body.internshipDuration,
        workExperience:req.body.workExperience,
        workDetails:req.body.workDetails,
        certifications:req.body.certifications,
        achievements:req.body.achievements,
        interestedRoles:req.body.interestedRoles,
        preferredRole:req.body.preferredRole,
        graduationYear:req.body.graduationYear,
        resume:req.file?{
            fileName:req.file.originalname,
            filePath:req.file.path
        }
      :undefined
     });
     res.status(201).json({
        message:"Application submitted successfully",
        application
     });
    }catch(error){
     console.error("Application error:",error);
     res.status(500).json({
        message:"Server error",
        error:error.message
     });
    }
};
export const getMyApplication=async(req,res)=>{
    try{
        const application=await Application.findOne({
           user:req.user.userId
        });
        if(!application){
            return res.status(404).json({
                message:"No application found"
            });
        }
        res.status(200).json({
            message:"Application feteched Successfully",
            application
        });
    }catch(error){
        console.error("Profile error:",error);
        res.status(500).json({
            message:"Server error",
            error:error.message
        });
    }
};