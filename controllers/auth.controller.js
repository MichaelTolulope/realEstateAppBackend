import generateTokenAndSetCookie from "../config/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcryptjs from "bcrypt"

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

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

        const hashedPassword = bcryptjs.hash(password, 10)
        const user = await User.create({ firstname, lastname, email, password: (await hashedPassword).toString() })
        generateTokenAndSetCookie(res,user._id,user.role);
        if (user) {
            return res.status(200)
                .send({
                    message: "User Created successfully!",
                    user:{
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

export const login = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400)
        .send({message:"all fields are required!"})
    }

    const userExits = await User.findOne({email})

    if(userExits){
        const passwordIsCorrect = await bcryptjs.compare(password,userExits.password);
       
        if(passwordIsCorrect){
            generateTokenAndSetCookie(res,userExits._id, userExits.role)
            return res.status(200).send({message:"login successfull!", user:{
                ...userExits._doc,
                password:undefined
            }})
        }
        else{
            return res.status(400).send({message:"password incorrect!"})
        }
    }
}