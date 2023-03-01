import express from "express"
import { authUser, getUserprofile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/", protect, admin, getUsers)
// router.get("/profile", protect, getUserprofile)
// router.put("/profile", protect, updateUserProfile)

router
    .route("/profile")
    .get(protect, getUserprofile)
    .put(protect, updateUserProfile)

router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
// router.get("/:id", protect, admin, getUserById)
// router.delete("/:id", protect, admin, deleteUser)


export default router