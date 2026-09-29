import fs from "fs";
import { PDFParse } from "pdf-parse";

import Resume from "../model/ResumeModel.js";
import Job from "../model/JobModel.js";

import {
    analyzeResume,
    matchResumeWithJob as matchResumeAI
} from "../services/aiService.js";

export const getMyResume = async (req, res) => {
    try {

        const resume = await Resume.findOne({
            user: req.user.userId,
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                message: "No resume found",
            });
        }

        res.status(200).json({
            message: "Resume fetched successfully",
            resume,
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message,
        });

    }
};

export const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF resume",
            });
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const parser = new PDFParse({
            data: fileBuffer,
        });

        const pdfData = await parser.getText();

        await parser.destroy();

        const resume = await Resume.create({

            user: req.user.userId,

            fileName: req.file.originalname,

            filePath: req.file.path,

            extractedText: pdfData.text,

        });

        res.status(201).json({

            message: "Resume uploaded successfully",

            resume,

            extractedText: pdfData.text,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Server error",

            error: error.message,

        });

    }
};
export const analyzeUploadedResume = async (req, res) => {

    try {

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        if (!resume.extractedText) {
            return res.status(400).json({
                message: "No text found in resume",
            });
        }

        const analysis = await analyzeResume(
            resume.extractedText
        );

        res.status(200).json({

            message: "Resume analyzed successfully",

            analysis,

        });

    } catch (error) {

        console.error("AI Analysis Error:", error);

        res.status(500).json({

            message: "AI Analysis failed",

            error: error.message,

        });

    }
};
export const matchResumeWithJob = async (req, res) => {

    try {

        const { resumeId, jobId } = req.params;

        // Find user's resume
        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user.userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        // Find job
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        if (!resume.extractedText) {
            return res.status(400).json({
                message: "Resume text not found",
            });
        }

        // Send resume + job to AI
        const matchResult = await matchResumeAI(
            resume.extractedText,
            job
        );

        res.status(200).json({

            message: "Resume matched with job successfully",

            matchResult,

        });

    } catch (error) {

        console.error("Job Matching Error:", error);

        res.status(500).json({

            message: "Resume-job matching failed",

            error: error.message,

        });

    }
};