import express from "express";
import { signUpUser, loginUser, sendMail} from "../controllers/user-controllers.js"

const router = express.Router();

router.post("/signup",signUpUser);
router.post("/login",loginUser);
router.post("/reset",sendMail);

export default router;