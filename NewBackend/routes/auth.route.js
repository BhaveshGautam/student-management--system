import  express  from "express";
import  { login, signup} from "../controller/user";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
module.exports = router;