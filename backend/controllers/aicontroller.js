import Application from "../model/ApplicationModel.js";
import { analyzeResume } from "../services/aiService.js";
export const analyzeApplication=async(req,res)=>{
    try{
        const application=await Application.findOne({
            user:req.user.userId
        });
        if(!application){
            return 
            res.status(404).json({
                message:"Please complete your application"
            });
        }
        const profileText=`
        Degree: ${application.degree}
Branch: ${application.branch}
College: ${application.college}
Skills: ${application.skills}

Internship: ${application.internship}
Internship Duration: ${application.internshipDuration}

Work Experience: ${application.workExperience}
Work Details: ${application.workDetails}

Certifications: ${application.certifications}
Achievements: ${application.achievements}

Interested Roles: ${application.interestedRoles}
Preferred Role: ${application.preferredRole}
`;
const aiResult=await analyzeResume(profileText);
let analysis;
try{
  analysis=JSON.parse(aiResult);
}catch(error){
  console.error("Invalid AI JSON:",aiResult);
  return res.status(500).json({
    message:"AI Returned invalid data"
  });
}
res.status(200).json({
    message:"AI Career analysis completed",
    analysis
});
    }catch(error){
        console.error("AI Controller error:",error);
        res.status(500).json({
            message:"AI analysis failed",
            error:error.message
        });
    }
}