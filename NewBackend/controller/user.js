import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, section, branch, year, rollNo, role } = req.body;
    // console.log("📩 Incoming signup:", req.body);

    if (!name || !email || !password || !section || !branch || !year || !rollNo || !role) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide complete details"
      });
    }

    const existingUser = await User.findOne({ email }); 
    // console.log("🔍 existingUser:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("🔐 Hashed password created");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      section,
      branch,
      year,
      rollNo,
      role
    });

    // console.log("✅ User created:", user);

    res.status(200).json({
      success: true,
      message: 'Account created successfully',
      data: user
    });

  } catch (error) {
    console.error("🔥 signup error:", error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide complete details"
      });
    }
     // finding  the user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }
     // comparing password
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }
    // jwt generation 
    const payload = {
      email: existingUser.email,
      role: existingUser.role,
      id: existingUser._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: existingUser
    });
  } catch (error) {
    console.error("🔥 login error:", error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


// MIDDLEWARE: isStudent
export const isStudent = (req, res, next) => {
    try {
        const role = req.user.role;

        if (!role) {
            return res.status(500).json({
                success: false,
                message: "Role not found"
            });
        }

        if (role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access denied: You are not a student"
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to authorize student"
        });
    }
};

// MIDDLEWARE: isAdmin
export const isAdmin = (req, res, next) => {
    try {
        const role = req.user.role;

        if (!role) {
            return res.status(500).json({
                success: false,
                message: "Role not found"
            });
        }

        if (role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied: You are not an admin"
            });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to authorize admin"
        });
    }
};

export const enrollStudent = async (req, res) => {
  try {
    const { courseid, studentid } = req.params;

    const course = await Course.findById(courseid);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (course.students.includes(studentid)) {
      return res.status(400).json({
        success: false,
        message: "Student already enrolled"
      });
    }

    course.students.push(studentid);
    await course.save();

    res.status(200).json({
      success: true,
      message: `Student ${studentid} enrolled in course ${courseid}`
    });

  } catch (error) {
    console.error("🔥 enrollStudent error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

