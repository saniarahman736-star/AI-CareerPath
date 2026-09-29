import Job from "../model/JobModel.js";
import JobMatch from "../model/JobMatchModel.js";
import Resume from "../model/ResumeModel.js";
import { matchResumeWithJob } from "../services/aiService.js";

export const createJob = async (req, res) => {
    try {
        const { title, company, description, skills, location, salary } = req.body;

        if (!title || !company || !description || !skills || !location || !salary) {
            return res.status(400).json({
                message: "Title, company, description and skills are required",
            });
        }

        const job = await Job.create({
            title,
            company,
            description,
            skills,
            location,
            salary,
        });

        res.status(200).json({
            message: "Job created successfully",
            job,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const matchJobs = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "No resume created",
            });
        }

        const jobs = await Job.find();

        const resumeText = resume.extractedText.toLowerCase();

        const results = jobs.map((job) => {

            const matchedSkills = job.skills.filter((skill) =>
                resumeText.includes(skill.toLowerCase())
            );

            const missedSkills = job.skills.filter(
                (skill) => !resumeText.includes(skill.toLowerCase())
            );

            const matchScore = Math.round(
                (matchedSkills.length / job.skills.length) * 100
            );

            return {
                job,
                matchScore,
                matchedSkills,
                missedSkills,
            };
        });

        results.sort((a, b) => b.matchScore - a.matchScore);

        res.status(200).json({
            message: "Job matches generated successfully",
            results,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const aiMatchJobs = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(400).json({
                message: "No resume found",
            });
        }

        const jobs = await Job.find();

        await JobMatch.deleteMany({
            user: req.user._id,
        });

        const results = [];

        for (const job of jobs) {

            const aiResponse = await matchResumeWithJob(
                resume.extractedText,
                job
            );

            let analysis;

            try {
                analysis = JSON.parse(aiResponse);
            } catch (error) {
                console.log(
                    "AI returned invalid JSON:",
                    aiResponse
                );
                continue;
            }

            const jobMatch = await JobMatch.create({
                user: req.user._id,
                job: job._id,
                matchScore: analysis.matchScore,
                matchedSkills: analysis.matchedSkills,
                missedSkills: analysis.missedSkills,
                reason: analysis.reason,
            });

            results.push({
                job,
                match: jobMatch,
            });
        }

        res.status(200).json({
            message: "AI job matching completed",
            results,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "AI matching failed",
            error: error.message,
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
            });
        }

        res.status(200).json({
            message: "Job fetched successfully",
            job,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};