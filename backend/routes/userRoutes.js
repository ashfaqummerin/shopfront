import express from "express"
import { authUser, getUserprofile, registerUser, updateUserProfile, getUsers } from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/profile", protect, getUserprofile)
router.put("/profile", protect, updateUserProfile)
router.get("/", protect, admin, getUsers)


export default router