import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// singup function
export const signup = async (req, res) => {
    try {
        const { Name, Email, Password, Section, Branch, year, RollNo } = req.body;
        if (!Name || !Email || !Password || !Section || !Branch || !year || !RollNo || role) {
            return res.status(400).json({
                success: false,
                message: "kindly provide complete details"
            })
        }
        const existingUser = await User.findOne({ Email });
        // check kr rhe hai ki user exist krta bhi ya nahii
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // await mtlab ki jab tk hashing pura na ho tab tk next loc ni chlega 
        // 10 means more iteration for strongly hashing the password 
        const hashedPassword = await bcrypt.hash(Password, 10)

        if (!hashedPassword) {
            return res.status(401).json({
                success: false,
                message: 'password did not hashed....'
            })
        }
        // { bracket mei ek object paas kia hai jo database m save ho jaye}
        // await means jab tk data create hokr databse mei save na ho tab tk code ruka 
        // rhega then response mei store hoga 
        const response = await User.create({ Name, Email, password: hashedPassword })

        res.status(200).json({
            success: true,
            message: 'acount created successfully...',
            response: data,
            // yha pr vo data return as response hoga jo user.create krta hai database mei 
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
// login function 
export const login = async (req, res) => {
    try {
        const { Email, Password, role } = req.body;
        if (!Email || !Password || role) {
            return res.status(400).json({
                success: false,
                message: "kindly provide complete details"
            });
        }
        // check kr rhe hai ki user exist krta bhi ya nahii
        const existingUser = await User.findOne({ Email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });

        }
        // hashing krne ke liye password ko extract kr rhe hai
        const isValidPassword = await bcrypt.compare(Password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }
        const payload =
        {
            email: User.email
        }

        // token generate krne ke liye

        let token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: '3h' })
        res.status(200).json({
            success: true,
            message: 'login successful', // means token return hogya used for login
            token: token,
            User
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const isStudent = (req, res, next) => {
    try {
        const role = req.user.role;

        if (!role) {
            return res.status(500).json({
                success: false,
                message: "failed to find role .....",
            });
        }

        if (role !== "Student") {
            return res.status(500).json({
                success: false,
                message: "You are not student....",
            });
        }

        next()

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to authorise student .....",
        });
    }
};

export const isAdmin = (req, res, next) => {
    try {
        const role = req.user.role

        if (!role) {
            return res.status(500).json({
                success: false,
                message: "failed to find role .....",
            });
        }

        if (role !== "Admin") {
            return res.status(500).json({
                success: false,
                message: "You are not Admin....",
            });
        }

        next()


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "failed to authorise Admin .....",
        });

    }
};


export function enrollStudent(courseId, studentId) {
    const course = course.find(course => course.id === courseId);

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
};