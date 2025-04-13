const Course = import("../models/Course");

// GET all courses with user emails
 export const getAllCoursesWithUsers = async (req, res) => {
  try {
    const courses = await Course.find().populate("Users", "email");
    res.status(200).json({ courses }); // ⬅️ changed "Course" to "courses"
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single course by ID
 export const getSingleCourse = async (req, res) => {
  try {
    const id = req.params.id; // ⬅️ fixed: directly use req.params.id
    const course = await Course.findById(id).populate("Users", "email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE a course by ID
 export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a course by ID
 export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports={getAllCoursesWithUsers, getSingleCourse,updateCourse,deleteCourse};
