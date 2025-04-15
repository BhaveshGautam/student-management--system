import express from "express";
import { enrollStudent } from "../controller/user.js";


const router = express.Router();
router.get('/enroll/:studentid/:courseid',enrollStudent);

export default router;