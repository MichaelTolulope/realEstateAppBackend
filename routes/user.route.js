import express from 'express'
import { getAllUsers, getOneUser } from '../controllers/user.controller.js'
import { login, signup } from '../controllers/auth.controller.js'
const router = express.Router()


//auth routes
router.post("/signup", signup)
router.post("/login", login)

router.get("/get-all", getAllUsers)
router.post("/get-one", getOneUser)


export default router;