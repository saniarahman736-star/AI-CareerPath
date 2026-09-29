import express from "express";
import { createContact } from "../controllers/contactcontroller.js";
const router=express.Router();
router.post("/",createContact);
export default router;