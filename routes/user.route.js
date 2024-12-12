import express from 'express'
import { getAllUsers, getOneUser, getUserProfile } from '../controllers/user.controller.js'
import { login, logout, resendVerificationEmail, signup, verifyEmail } from '../controllers/auth.controller.js'
import protection from '../middlewares/protectRoute.js'
const router = express.Router()


//auth routes
router.post("/signup", signup)
router.post("/verify-email", verifyEmail)
router.post("/resend-verification-email", resendVerificationEmail)
router.post("/login", login)
router.post("/logout",logout)

router.get("/get-all", getAllUsers)
router.post("/get-one/:id", getOneUser)

router.get("/get-user-profile",protection("user"), getUserProfile)


export default router;