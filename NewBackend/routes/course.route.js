import express from "express"
import {getAllCoursesWithUsers,getSingleCourse,updateCourse,deleteCourse} from "../controller/course.js";
import { createCourse } from "../controller/admin.js";

const router = express.Router();
router.post('api/courses',createCourse);
router.get("/", getAllCoursesWithUsers);
router.get("/:id", getSingleCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
