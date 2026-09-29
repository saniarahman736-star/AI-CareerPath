import express from "express";

import { analyzeProfile } from "../controllers/analyzecontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    analyzeProfile
);

export default router;