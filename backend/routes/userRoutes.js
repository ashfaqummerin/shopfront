import express from "express"
import { authUser, getUserprofile, registerUser, updateUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/profile", protect, getUserprofile)
router.put("/profile", protect, updateUserProfile)


export default router