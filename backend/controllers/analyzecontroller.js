import Application from "../model/ApplicationModel.js";
import { analyzeResume } from "../services/aiService.js";

export const analyzeProfile = async (req, res) => {
    try {
        // Get the logged-in user's application
        const application = await Application.findOne({
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        // Convert the application into text for the AI
        const profileText = `
Name: ${application.name}

Email: ${application.email}

Phone: ${application.phone}

Degree: ${application.degree}

Branch: ${application.branch}

College: ${application.college}

Graduation Year: ${application.graduationYear}

Technical Skills:
${application.skills}

Internship:
${application.internship || "None"}

Internship Duration:
${application.internshipDuration || "None"}

Work Experience:
${application.workExperience || "None"}

Work Details:
${application.workDetails || "None"}

Certifications:
${application.certifications || "None"}

Achievements:
${application.achievements || "None"}

Interested Roles:
${application.interestedRoles || "None"}

Preferred Role:
${application.preferredRole || "None"}
`;

        console.log("Sending profile to AI...");

        // Send profile to Groq
        const aiResponse = await analyzeResume(profileText);

        console.log("Raw AI Response:", aiResponse);

        // Remove possible markdown code fences
        const cleanedResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Convert AI JSON string into JavaScript object
        const analysis = JSON.parse(cleanedResponse);

        res.status(200).json({
            message: "AI analysis successful",
            analysis
        });

    } catch (error) {

        console.error("AI Analysis error:", error);

        res.status(500).json({
            message: "AI analysis failed",
            error: error.message
        });
    }
};