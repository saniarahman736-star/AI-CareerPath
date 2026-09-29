import "dotenv/config";
import Groq from "groq-sdk";
const groq=new Groq({
    apiKey:process.env.GROQ_API_KEY,
});
export const analyzeResume=async(profileText)=>{
    const prompt=`You are an expert AI career advisor and technical recruiter.

Analyze the candidate's profile and determine the career roles
that best match the candidate.

Return ONLY valid JSON in exactly this format:

{
    "resumeScore": 0,
    "technicalSkills": [],
    "softSkills": [],
    "strengths": [],
    "weaknesses": [],
    "missingSkills": [],
    "suggestions": [],
    "recommendedRoles": []
}

Rules:

1. resumeScore must be between 0 and 100.
2. Detect technical skills from the candidate's information.
3. Detect soft skills when possible.
4. Identify strengths and weaknesses.
5. Identify useful missing skills.
6. Give improvement suggestions.
7. MOST IMPORTANT:
   Determine the best career roles based on the candidate's
   actual skills, education, internship and experience.
8. Do NOT always recommend the same roles.
9. Do NOT assume the candidate is a frontend developer,
   backend developer or full stack developer.
10. recommendedRoles should contain 3 to 5 roles that genuinely
    match the candidate's profile.
Candidate Profile:
    ${profileText}
    `;
    const response=await groq.chat.completions.create({
        model:
          "openai/gpt-oss-120b",
          messages:[
            {
                role:"user",
                content:prompt,
            }
          ],
          temperature:0.2,
    });
    return response.choices[0].message.content;
}
export const matchResumeWithJob=async(resumeText,job)=>{
    const prompt=`
You are an expert technical recruiter.
Compare the candidate's resume with the job description.
Return Only valid JSON in this format:
{
  "matchScore":0,
  "matchedSkills":[],
  "missedSkills":[],
  "reason":""
}
The matchScore must be between 0 and 100.
Candidate Resume:
${resumeText}
Job Title:
${job.title}
Company:
${job.company}
Description:
${job.description}
Required Skills:
${job.skills.join(", ")}
`;
const response=await groq.chat.completions.create({
    model:
    "openai/gpt-oss-120b",
    messages:[
        {
            role:"user",
            content:prompt,
        }
    ],
    temperature:0.2,
});
return response.choices[0].message.content;
}
