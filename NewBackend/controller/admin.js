import Course from "../models/Course.js";
 export const getCourseAttendance = async (req,res)=>{
    try {
        const id = req.params.courseId;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const attendance = await attendance.find({ course: id });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error fetching in attendance" });
    }
}

  export const createCourse = async (req, res) => {
    try {
      const { name,totalMarks, coursecode} = req.body;
  
      if (!title ||!totalMarks||!coursecode) {
        return res.status(400).json({ message: "Course title is required." });
      }
  
      const newCourse = new Course({ name,totalMarks, coursecode});
      await newCourse.save();
      res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Server error" });
    }
  };