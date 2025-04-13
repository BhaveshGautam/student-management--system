const express = import("express");
import {getAllCoursesWithUsers,getSingleCourse,updateCourse,deleteCourse} from ("../controller/course").default;

const router = express.Router();

router.get("/", getAllCoursesWithUsers);
router.get("/:id", getSingleCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
