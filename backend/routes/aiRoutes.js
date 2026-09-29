import express from "express";
import { analyzeApplication} from "../controllers/aicontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router=express.Router();
router.post("/analyze",authMiddleware,analyzeApplication);
export default router;