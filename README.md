A backend-based Student Management System built using Node.js, Express.js, MongoDB, and JWT Authentication.
This system provides secure login/signup functionality, course management (CRUD), and student enrollment features.

🚀 Features
🔐 Authentication

User signup and login

Password hashing using bcrypt

JWT-based authentication middleware to protect private routes

📚 Course Management

Create new courses

Get all courses or a specific course

Update course details

Delete a course

🎓 Student Enrollment

Enroll a student into a course

Fetch enrolled course data for a user

🗂️ Clean Project Architecture (MVC)

/routes → All route files

/controllers → Handles logic for auth, courses, user

/models → Mongoose schemas (User, Course)

/middlewares → JWT authentication



student-management-system/
│
├── controllers/
│   ├── auth.controller.js
│   ├── course.controller.js
│   └── user.controller.js
│
├── models/
│   ├── user.model.js
│   └── course.model.js
│
├── routes/
│   ├── auth.route.js
│   ├── course.route.js
│   └── user.route.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── config/
│   └── db.js
│
├── server.js
└── package.json



Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/your-username/student-management-system.git
cd student-management-system

Install dependencies --->npm install

Authentication Workflow

User signs up → password is encrypted using bcrypt

User logs in → receives JWT token

For protected routes:

Add header:
Authorization: Bearer <token>

Middleware validates token before executing controller logic
