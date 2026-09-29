import express from "express";
import {getProfile} from "../controllers/usercontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
const router=express.Router();
router.get("/profile",authMiddleware,getProfile);
export default router;
