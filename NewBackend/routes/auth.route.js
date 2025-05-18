import  express  from "express";
import { login, signup } from "../controller/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);

export default router;