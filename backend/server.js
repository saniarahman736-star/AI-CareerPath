import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/application",applicationRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/contact",contactRoutes);
connectDB();
app.get("/",(req,res)=>{
    res.json({
        message:"AI CareerMatch Backend is running",
    });
});
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
