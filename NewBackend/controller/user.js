import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { Name, Email, Password, section, Branch, year, RollNo, role } = req.body;

        if (!Name || !Email || !Password || !section || !Branch || !year || !RollNo || !role) {
            return res.status(400).json({
                success: false,
                message: "Kindly provide complete details"
            });
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = await User.create({
            Name,
            Email,
            password: hashedPassword,
            section,
            Branch,
            year,
            RollNo,
            role
        });

        res.status(200).json({
            success: true,
            message: 'Account created successfully',
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { Email, Password, role } = req.body;

        if (!Email || !Password || !role) {
            return res.status(400).json({
                success: false,
                message: "Kindly provide complete details"
            });
        }

        const existingUser = await User.findOne({ Email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isValidPassword = await bcrypt.compare(Password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const payload = {
            email: existingUser.Email,
            role: existingUser.role,
            id: existingUser._id
        };

        const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: '3h' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: existingUser
        });
    } catch (error) {
        console.error(error);
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

export function enrollStudent(courses, courseId, studentId) {
    const course = courses.find(course => course.id === courseId);

    if (!course) {
        console.log("Course not found");
        return;
    }

    if (course.students.includes(studentId)) {
        console.log("Student already enrolled");
        return;
    }

    course.students.push(studentId);
    console.log(`Student ${studentId} enrolled in course ${courseId}`);
}
