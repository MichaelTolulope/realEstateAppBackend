import generateTokenAndSetCookie from "../config/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/mail.js";
import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcrypt"

export const signup = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    try {
        if (!firstname || !lastname || !email || !password) {
            return new Error("all fields are required!")
        }

        const userExits = await User.findOne({ email })

        if (userExits) {
            return res.status(400)
                .send({
                    message: `user with ${email} already exist`
                })
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const hashedPassword = bcryptjs.hash(password, 10)
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: (await hashedPassword).toString(),
            role,
            verificationCode,
            verificationExpires: Date.now() + 5 * 60 * 1000
        })

        generateTokenAndSetCookie(res, user._id, user.role);
        if (user) {
            sendVerificationEmail(user.email, verificationCode)

            return res.status(200)
                .send({
                    message: "User Created successfully!",
                    user: {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role

                    }
                })
        }

    } catch (error) {
        console.log(error);

    }
}

export const verifyEmail = async (req,res)=>{
    const {verificationCode} = req.body
   try {
    const isValid = await userModel.findOne({
        verificationCode,
        verificationExpires: {$gt: Date.now()}
    })
    console.log(isValid);
    

    if(isValid){
        return res.status(200)
        .send({
            message: "Email verification successfull!"
        })
    }else{
        return res.status(400)
        .send({
            message:"Invalid or expired token!"
        })
    }
   } catch (error) {
     console.log(error.message);
     
   }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400)
            .send({ message: "all fields are required!" })
    }

    const userExits = await User.findOne({ email })

    if (userExits) {
        const passwordIsCorrect = await bcryptjs.compare(password, userExits.password);

        if (passwordIsCorrect) {
            generateTokenAndSetCookie(res, userExits._id, userExits.role)
            return res.status(200).send({
                message: "login successfull!", user: {
                    ...userExits._doc,
                    password: undefined
                }
            })
        }
        else {
            return res.status(400).send({ message: "password incorrect!" })
        }
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token").status(200).send({ message: "logged out successfully!" });

}