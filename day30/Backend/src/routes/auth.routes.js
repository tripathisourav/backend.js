import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { registerValidation } from "../validation/auth.validator.js";

const authRouter = Router();


authRouter.post("/register", registerValidation, registerUser);
// controllers se db connected rehta hai or read and right operations kafi expensive bhi hote hai db mein toh hm koi galat req na bhej de db mein usse pehle hm express-validator se check krlete hai data shi toh hai ya nahi, agar galat hai toh usse pehle hi error throw kar dete hai taki db mein koi galat data na jaye, aur agar data sahi hai toh uske baad hi controller ke function ko call karte hai jo ki db se connected hota hai aur read and write operations karta hai.


export default authRouter;