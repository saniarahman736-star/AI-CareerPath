import express from "express";
import {
    createApplication,
    getMyApplication
} from "../controllers/applicationcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import upload from "../middleware/uploadmiddleware.js";
const router=express.Router();
router.post(
    "/",authMiddleware,upload.single("resume"),
    createApplication
);
router.get(
    "/my-application",
    authMiddleware,
    getMyApplication
);
export default router;