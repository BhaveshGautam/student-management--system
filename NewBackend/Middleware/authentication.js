const dotenv = import("dotenv");
dotenv.config();

const jwt = import("jsonwebtoken");
const admin = import("./models/admin.js");

export const auth = async (req, res, next) => {
  try {
    const token =
      (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token || req.body.token || req.query.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = payload; // attach user info to request
    next();

  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate...",
    });
  }
};

module.exports = { auth };
