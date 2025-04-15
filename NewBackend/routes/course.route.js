import express from "express"
import {getAllCoursesWithUsers,getSingleCourse,updateCourse,deleteCourse} from "../controller/course.js";

const router = express.Router();

router.get("/", getAllCoursesWithUsers);
router.get("/:id", getSingleCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
